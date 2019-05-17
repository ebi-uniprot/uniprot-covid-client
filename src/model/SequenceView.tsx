import React, { Fragment, useState, useEffect } from 'react';
import { InfoList, Sequence } from 'franklin-sites';
import { CommentType } from './types/commentType';
import apiUrls from '../utils/apiUrls';
import fetchData from '../utils/fetchData';
import { formatLargeNumber } from '../utils/utils';
import idx from 'idx';

export enum Flag {
  PRECURSOR = 'Precursor',
  FRAGMENT = 'Fragment',
  FRAGMENTS = 'Fragments',
  FRAGMENT_PRECURSOR = 'Fragment,Precursor',
  FRAGMENTS_PRECURSOR = 'Fragments,Precursor',
}

type Isoform = {
  name: { value: string };
  isoformSequenceStatus: string;
  isoformIds: string[];
  synonyms: Array<{ value: string }>;
  note: { texts: Array<{ value: string }> };
  sequenceIds: string[];
};

export type AlternativeProducts = {
  commentType: CommentType.ALTERNATIVE_PRODUCTS;
  isoforms: Isoform[];
  note: { texts: Array<{ value: string }> };
  events: string[];
};

type Sequence = {
  value: string;
  length: number;
  molWeight: number;
  crc64: string;
};

type SequenceViewProps = {
  data: {
    accession: string;
    entryAudit?: {
      lastSequenceUpdateDate: string;
      sequenceVersion: string;
    };
    proteinDescription?: {
      flag?: Flag;
    };
    sequence: Sequence;
    comments?: AlternativeProducts[];
  };
};

export const SequenceInfo: React.FC<{
  isoformId: string;
  isoformSequence?: Sequence;
  lastUpdateDate?: string | null;
}> = ({ isoformId, isoformSequence, lastUpdateDate }) => {
  const [data, setData] = useState(null);
  const [isoformToFetch, setIsoformToFetch] = useState('');

  useEffect(() => {
    if (!isoformToFetch) {
      return;
    }
    const fetchIsoformData = async () => {
      const result = await fetchData(`${apiUrls.entry(isoformToFetch)}`);
      setData(result.data.sequence);
    };

    fetchIsoformData();
  }, [isoformToFetch]);

  const dataToDisplay = data ? data : isoformSequence;

  if (!dataToDisplay) {
    return (
      <button
        type="button"
        className="button"
        onClick={() => setIsoformToFetch(isoformId)}
      >
        Load sequence
      </button>
    );
  }
  const infoData = [
    {
      title: 'Length',
      content: dataToDisplay.length,
    },
    {
      title: 'Mass (Da)',
      content: formatLargeNumber(dataToDisplay.molWeight),
    },
    {
      title: 'Last updated',
      content: lastUpdateDate,
    },
    {
      title: 'Checksum',
      content: dataToDisplay.crc64,
    },
  ];
  return (
    <Fragment>
      {dataToDisplay && <InfoList infoData={infoData} />}
      <Sequence sequence={dataToDisplay.value} />
    </Fragment>
  );
};

export const IsoformInfo: React.FC<{ isoformData: Isoform }> = ({
  isoformData,
}) => {
  const infoListData = [
    {
      title: 'Name',
      content: isoformData.name.value,
    },
    {
      title: 'Synonyms',
      content: (idx(isoformData, _ => _.synonyms) || [])
        .map(syn => syn.value)
        .join(', '),
    },
    {
      title: 'Note',
      content:
        isoformData.note &&
        isoformData.note.texts.map(note => note.value).join(', '),
    },
  ];
  // TODO isoformData.sequenceIds is used to get the features for
  // splice variants - they need to be somehow displayed
  return (
    <Fragment key={isoformData.isoformIds.join('')}>
      <hr />
      <h4>{isoformData.isoformIds.join(', ')}</h4>
      {isoformData.isoformSequenceStatus === 'Displayed' && (
        <p>
          This isoform has been chosen as the <strong>canonical</strong>{' '}
          sequence. All positional information in this entry refers to it. This
          is also the sequence that appears in the downloadable versions of the
          entry.
        </p>
      )}
      <InfoList infoData={infoListData} />
    </Fragment>
  );
};

export const SequenceViewEntry: React.FC<SequenceViewProps> = ({ data }) => {
  console.log(data);
  const sequenceInfoData = [
    {
      title: 'Sequence status',
      content: data.status,
    },
    {
      title: 'Sequence processing',
      content: data.processing,
    },
  ];

  // Every entry should have a sequence
  if (!data.sequence) {
    return null;
  }

  const canonicalComponent = (
    <SequenceInfo
      isoformId={data.accession}
      isoformSequence={data.sequence}
      lastUpdateDate={data.lastUpdateDate}
    />
  );

  if (!data.alternativeProducts && data.sequence) {
    return canonicalComponent;
  }

  if (!data.alternativeProducts) {
    return null;
  }

  let isoformCountNode;
  if (data.alternativeProducts.isoforms && data.alternativeProducts.events) {
    isoformCountNode = (
      <p>
        This entry describes{' '}
        <strong>{data.alternativeProducts.isoforms.length}</strong> isoforms
        produced by{' '}
        <strong>{data.alternativeProducts.events.join(' & ')}</strong>.
      </p>
    );
  }

  let notesNode;
  const texts = idx(data.alternativeProducts, _ => _.note.texts);
  if (texts) {
    notesNode = <p>{texts.map(text => text.value).join(' ')}</p>;
  }

  let isoformsNode;
  if (data.alternativeProducts.isoforms) {
    isoformsNode = data.alternativeProducts.isoforms.map(isoform => {
      const isoformComponent = (
        <SequenceInfo isoformId={isoform.isoformIds[0]} />
      );
      return (
        <Fragment key={isoform.isoformIds.join('')}>
          <IsoformInfo isoformData={isoform} />
          {isoform.isoformSequenceStatus === 'Displayed'
            ? canonicalComponent
            : isoformComponent}
        </Fragment>
      );
    });
  }

  return (
    <Fragment>
      <InfoList infoData={sequenceInfoData} />
      {isoformCountNode}
      {notesNode}
      {isoformsNode}
    </Fragment>
  );
};
