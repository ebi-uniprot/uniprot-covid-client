import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import queryString from 'query-string';
import { SearchInput } from 'franklin-sites';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';

import useDataApi from '../../shared/hooks/useDataApi';

import { addMessage } from '../../messages/state/messagesActions';

import uniProtKBApiUrls from '../../uniprotkb/config/apiUrls';
import uniParcApiUrls from '../../uniparc/config/apiUrls';

import entryToFASTAWithHeaders from '../../uniprotkb/adapters/entryToFASTAWithHeaders';
import { uniProtKBAccessionRegEx } from '../../uniprotkb/utils';
import fetchData from '../../shared/utils/fetchData';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { APISequenceData } from '../blast/types/apiSequenceData';
import { EntryType } from '../../uniprotkb/adapters/uniProtkbConverter';

const getURLForAccessionOrID = (input: string) => {
  const cleanedInput = input.trim().toUpperCase();
  if (!cleanedInput) {
    return null;
  }

  // UniParc accession
  if (cleanedInput.startsWith('UPI')) {
    return uniParcApiUrls.entry(cleanedInput);
  }

  // UniProtKB accession
  if (uniProtKBAccessionRegEx.test(cleanedInput)) {
    return uniProtKBApiUrls.entry(cleanedInput);
  }

  // UniProtKB ID
  const query = queryString.stringify({
    query: `id:${cleanedInput}`,
    fields:
      'sequence,id,reviewed,protein_name,organism_name,protein_existence,sequence_version',
  });

  return `${uniProtKBApiUrls.search}?${query}`;
};

// name as a NCBI ID formatted UniProt-style
const nameFromEntry = (entry: APISequenceData) =>
  entry.uniProtkbId
    ? `${entry.entryType === EntryType.REVIEWED ? 'sp' : 'tr'}|${
        entry.primaryAccession
      }|${entry.uniProtkbId}`
    : '';

export type ParsedSequence = {
  sequence: string;
  raw: string;
  header: string;
  valid: boolean;
  likelyType: 'na' | 'aa' | null;
  message: string | null;
  name?: string;
};

type NetworkResponses = { results: APISequenceData[] } | APISequenceData;

export interface SequenceSearchLoaderInterface {
  reset: () => void;
}

const SequenceSearchLoader = forwardRef<
  SequenceSearchLoaderInterface,
  { onLoad: (event: ParsedSequence[]) => void }
>(({ onLoad }, ref) => {
  const [accessionOrID, setAccessionOrID] = useState('');
  // flag, abused to store previous value of the field
  const [pasteLoading, setPasteLoading] = useState(false);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    reset: () => setAccessionOrID(''),
  }));

  // used to keep a reference to the previously generated sequence string
  const sequenceRef = useRef('');

  const urlForAccessionOrID = getURLForAccessionOrID(accessionOrID);
  const { data, loading } = useDataApi<NetworkResponses>(urlForAccessionOrID);

  let entry: APISequenceData | null = null;
  if (data) {
    if ('results' in data) {
      [entry] = data.results;
    } else {
      entry = data;
    }
  }

  // no entry found, probably invalid query, reset ref
  if (!entry) {
    sequenceRef.current = '';
  }

  useEffect(() => {
    if (!entry || entry.entryType === EntryType.INACTIVE) {
      return;
    }

    if (!urlForAccessionOrID) {
      onLoad([
        {
          raw: '',
          header: '',
          sequence: '',
          valid: false,
          likelyType: null,
          message: null,
        },
      ]);
      return;
    }

    const sequence = `${entryToFASTAWithHeaders(entry)}\n`;

    if (sequence === sequenceRef.current) {
      // if the new generated sequence would be the same than the previously
      // generated one, don't do anything
      // we must have end up here because something else update (e.g. the user
      // manually updated the sequence)
      return;
    }

    // set ref to the value of the sequence we are about to set
    sequenceRef.current = sequence;

    onLoad([
      {
        raw: sequence,
        // no need to fill the rest, it will be parsed again later
        header: '',
        sequence: '',
        valid: true,
        likelyType: null,
        message: null,
        name: nameFromEntry(entry),
      },
    ]);
  }, [entry, onLoad, urlForAccessionOrID, accessionOrID]);

  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      // clipboard data not supported, just ignore that paste event and let the
      // browser handle it as a change
      if (!('clipboardData' in event)) {
        return;
      }
      const pastedContent = event.clipboardData.getData('text/plain');
      // use a Set to remove duplicate
      const potentialAccessions = new Set(
        pastedContent.split(/\W+/).map((text) => text.toUpperCase())
      );
      if (!potentialAccessions.size) {
        return;
      }

      // prevent displaying the content of the clipboard and empty the input
      event.preventDefault();
      setAccessionOrID('');
      setPasteLoading(true);

      try {
        const parsedSequences = [];
        const errors = [];
        for (const acc of potentialAccessions) {
          try {
            const url = getURLForAccessionOrID(acc);
            if (!url) {
              continue; // eslint-disable-line no-continue
            }
            // eslint-disable-next-line no-await-in-loop
            let { data } = await fetchData<NetworkResponses>(url);
            if ('results' in data) {
              [data] = data.results;
            }

            if (data.entryType === EntryType.INACTIVE) {
              throw new Error('inactive, no sequence available');
            }

            parsedSequences.push({
              raw: `${entryToFASTAWithHeaders(data)}\n`,
              // no need to fill the rest, it will be parsed again later
              header: '',
              sequence: '',
              valid: true,
              likelyType: null,
              message: null,
              name: nameFromEntry(data),
            });
          } catch (_) {
            errors.push(acc);
          }
        }
        onLoad(parsedSequences);
        if (errors.length) {
          dispatch(
            addMessage({
              id: v1(),
              content: `There was an issue retrieving sequence data for: ${errors.join(
                ', '
              )}`,
              format: MessageFormat.POP_UP,
              level: MessageLevel.FAILURE,
            })
          );
        }
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      } finally {
        setAccessionOrID(accessionOrID); // reset to previous value
        setPasteLoading(false);
      }
    },
    [onLoad, dispatch, accessionOrID, setAccessionOrID]
  );

  return (
    <SearchInput
      isLoading={loading || pasteLoading}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setAccessionOrID(event.target.value)
      }
      onPaste={handlePaste}
      placeholder={pasteLoading ? 'loading from pasted text' : 'UniProt IDs'}
      value={accessionOrID}
      disabled={pasteLoading}
    />
  );
});

export default SequenceSearchLoader;
