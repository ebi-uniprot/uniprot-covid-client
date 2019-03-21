import React, { Fragment } from 'react';
import { InfoList, Sequence } from 'franklin-sites';
import { FreeTextType } from './FreeText';

type SequenceViewProps = {
  data: {
    entryAudit?: {
      lastSequenceUpdateDate?: string;
      sequenceVersion: string;
    };
    proteinDescription?: {
      flag?: string;
    };
    sequence?: {
      value: string;
      length: number;
      molWeight: number;
      crc64: string;
    };
    comments?: [
      {
        commentType: FreeTextType;
        isoforms: [{}];
        events: string[];
        note: { texts: Array<{ value: string }> };
      }
    ];
  };
};

const displaySequence = (
  isoformSequence: SequenceViewProps['data']['sequence'],
  lastUpdateDate: string | null
) => {
  const infoData = [
    {
      title: 'Length',
      content: isoformSequence.length,
    },
    {
      title: 'Mass (Da)',
      content: isoformSequence.molWeight,
    },
    {
      title: 'Last updated',
      content: lastUpdateDate,
    },
    {
      title: 'Checksum',
      content: isoformSequence.crc64,
    },
  ];
  return (
    <Fragment>
      {isoformSequence && <InfoList infoData={infoData} />}
      <Sequence sequence={isoformSequence.value} />
    </Fragment>
  );
};

const displayIsoform = (
  isoformData,
  isoformSequence: SequenceViewProps['data']['sequence'],
  lastUpdateDate: string | null
) => {
  const infoListData = [
    {
      title: 'Isoform',
      content: isoformData.isoformIds.join(', '),
    },
    {
      title: 'Name',
      content: isoformData.name.value,
    },
    {
      title: 'Synonyms',
      content:
        isoformData.synonyms &&
        isoformData.synonyms.map(syn => syn.value).join(', '),
    },
    {
      title: 'Note',
      content:
        isoformData.note &&
        isoformData.note.texts.map(note => note.value).join(', '),
    },
    {
      title: 'Sequence ids',
      content: isoformData.sequenceIds && isoformData.sequenceIds.join(', '),
    },
  ];
  return (
    <Fragment key={isoformData.isoformIds}>
      <hr />
      {isoformData.isoformSequenceStatus === 'Displayed' && <p>This isoform has been chosen as the <strong>canonical</strong> sequence. All positional information in this entry refers to it. This is also the sequence that appears in the downloadable versions of the entry.</p>}
      <InfoList infoData={infoListData} />
      {isoformSequence && displaySequence(isoformSequence, lastUpdateDate)}
    </Fragment>
  );
};

export const SequenceViewEntry: React.FC<SequenceViewProps> = ({ data }) => {
  const sequenceInfoData = [
    {
      title: 'Sequence status',
      content:
        data.proteinDescription.flag === 'Fragment'
          ? data.proteinDescription.flag
          : 'Complete',
    },
    {
      title: 'Sequence processing',
      content: '????',
    },
  ];

  const alternativeProducts = data.comments.find(
    comment => comment.commentType === FreeTextType.ALTERNATIVE_PRODUCTS
  );
  if (!alternativeProducts) {
    return;
  }
  return (
    <Fragment>
      <InfoList infoData={sequenceInfoData} />
      <p>
        This entry describes{' '}
        <strong>{alternativeProducts.isoforms.length}</strong> isoforms produced
        by <strong>{alternativeProducts.events.join(' & ')}</strong>.
      </p>
      <p>{alternativeProducts.note.texts.map(text => text.value).join(' ')}</p>
      {alternativeProducts.isoforms.map(isoform =>
        displayIsoform(
          isoform,
          isoform.isoformSequenceStatus === 'Displayed' && data.sequence,
          `${data.entryAudit.lastSequenceUpdateDate} v${
            data.entryAudit.sequenceVersion
          }`
        )
      )}
    </Fragment>
  );
};
