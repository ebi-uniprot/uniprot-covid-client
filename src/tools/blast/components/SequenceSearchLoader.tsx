import React, { FC, useState, useEffect, ChangeEvent } from 'react';

import { SearchInput, extractNameFromFASTAHeader } from 'franklin-sites';
import queryString from 'query-string';

import useDataApi from '../../../shared/hooks/useDataApi';
import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import { uniProtKBAccessionRegEx } from '../../../uniprotkb/utils';

const getURLForAccessionOrID = (input: string) => {
  const cleanedInput = input.trim();
  if (!cleanedInput) {
    return null;
  }

  const query = queryString.stringify({
    query: uniProtKBAccessionRegEx.test(cleanedInput)
      ? `accession:${cleanedInput}`
      : `id:${cleanedInput}`,
    fields: 'sequence, id',
  });

  return `${uniProtKBApiUrls.search}?${query}`;
};

export type SequenceSubmissionOnChangeEvent = {
  sequence: string;
  valid: boolean;
  likelyType: 'na' | 'aa' | null;
  message: string | null;
  name?: string;
};

const SequenceSearchLoader: FC<{
  onLoad: (event: SequenceSubmissionOnChangeEvent) => void;
}> = ({ onLoad }) => {
  const [accessionOrID, setAccessionOrID] = useState('');

  const urlForAccessionOrID = getURLForAccessionOrID(accessionOrID);
  const { data, loading } = useDataApi(urlForAccessionOrID || '');
  const sequence = data?.results?.[0]?.sequence?.value;

  useEffect(() => {
    if (urlForAccessionOrID && !sequence) {
      onLoad({
        sequence: '',
        valid: false,
        likelyType: null,
        message: null,
      });
    } else {
      onLoad({
        sequence: sequence || '',
        valid: true,
        likelyType: null,
        message: null,
        name: extractNameFromFASTAHeader(sequence) || accessionOrID,
      });
    }
  }, [sequence, onLoad, urlForAccessionOrID, accessionOrID]);

  return (
    <SearchInput
      isLoading={loading}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setAccessionOrID(e.target.value)
      }
      placeholder="P05067, A4_HUMAN, UPI0000000001"
      value={accessionOrID}
    />
  );
};

export default SequenceSearchLoader;
