import React, { Fragment, useState, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import { InfoList, Sequence, ExternalLink } from 'franklin-sites';
import idx from 'idx';
import { Link } from 'react-router-dom';
import {
  Isoform,
  SequenceCautionComment,
  MassSpectrometryComment,
  RNAEditingComment,
  AlternativeProductsComment,
} from '../../../model/types/CommentTypes';
import apiUrls from '../../../utils/apiUrls';
import fetchData from '../../../utils/fetchData';
import { formatLargeNumber } from '../../../utils/utils';
import { SequenceUIModel } from '../../../model/uniprotkb/sections/SequenceConverter';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import numberView, { Unit } from './NumberView';
import externalUrls from '../../../utils/externalUrls';

export type SequenceData = {
  value: string;
  length: number;
  molWeight: number;
  crc64: string;
};

type SequenceViewProps = {
  accession: string;
  data: SequenceUIModel;
};

export const SequenceInfo: React.FC<{
  isoformId: string;
  isoformSequence?: SequenceData;
  lastUpdateDate?: string | null;
}> = ({ isoformId, isoformSequence, lastUpdateDate }): JSX.Element => {
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

  const dataToDisplay = data || isoformSequence;

  if (!dataToDisplay) {
    return (
      <button
        type="button"
        className="button secondary"
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
      <Sequence sequence={dataToDisplay.value} accession={isoformId} />
    </Fragment>
  );
};

export const IsoformInfo: React.FC<{
  isoformData: Isoform;
  canonicalAccession: string;
}> = ({ isoformData, canonicalAccession }) => {
  const infoListData = [
    {
      title: 'Name',
      content: isoformData.name.value,
    },
    {
      title: 'Synonyms',
      content: (idx(isoformData, o => o.synonyms) || [])
        .map(syn => syn.value)
        .join(', '),
    },
    {
      title: 'Differences from canonical',
      content: isoformData.varSeqs && !!isoformData.varSeqs.length && (
        <ul className="no-bullet">
          {isoformData.varSeqs.map(
            ({ location, alternativeSequence, evidences }) => (
              <li key={`${location.start.value}-${location.end.value}`}>
                <Link
                  to={`/blast/accession/${canonicalAccession}/positions/${location.start.value}-${location.end.value}`}
                >{`${location.start.value}-${location.end.value}: `}</Link>
                {alternativeSequence && alternativeSequence.originalSequence
                  ? `${
                      alternativeSequence.originalSequence
                    }  → ${alternativeSequence.alternativeSequences &&
                      alternativeSequence.alternativeSequences.join(', ')}`
                  : 'Missing'}
                {evidences && <UniProtEvidenceTag evidences={evidences} />}
              </li>
            )
          )}
        </ul>
      ),
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
  const name = isoformData.isoformIds.join(', ');
  return (
    <Fragment key={isoformData.isoformIds.join('')}>
      <hr />
      <h3 id={name}>{name}</h3>
      {isoformData.isoformSequenceStatus === 'Displayed' && (
        <p>
          {'This isoform has been chosen as the '}
          <strong>canonical</strong>
          {' sequence. All positional information in '}
          {'this entry refers to it. This is also the sequence '}
          {'that appears in the downloadable versions of the entry.'}
        </p>
      )}
      <InfoList infoData={infoListData} />
    </Fragment>
  );
};

export const SequenceCautionView: React.FC<{
  data: SequenceCautionComment[];
}> = ({ data }) => {
  return (
    <Fragment>
      {data.map(({ sequence, sequenceCautionType, note, evidences }) => (
        <section
          className="text-block"
          key={`${sequenceCautionType}-${sequence}`}
        >
          {`The sequence `}
          <ExternalLink url={externalUrls.ENA(sequence)}>
            {sequence}
          </ExternalLink>
          {` differs from that shown. Reason: ${sequenceCautionType} `}
          {note}
          {evidences && <UniProtEvidenceTag evidences={evidences} />}
        </section>
      ))}
    </Fragment>
  );
};

export const MassSpectrometryView: React.FC<{
  data: MassSpectrometryComment[];
}> = ({ data }) => {
  return (
    <Fragment>
      {data.map(item => (
        <section className="text-block" key={`${item.molWeight}${item.method}`}>
          {item.molecule && <h3>${item.molecule}</h3>}
          {`Molecular mass is ${numberView({
            value: item.molWeight,
            unit: Unit.DA,
          })}. `}
          Determined by {item.method}. {item.note}{' '}
          <UniProtEvidenceTag evidences={item.evidences} />
        </section>
      ))}
    </Fragment>
  );
};

export const RNAEditingView: React.FC<{ data: RNAEditingComment[] }> = ({
  data,
}) => (
  <Fragment>
    {data.map(item => (
      <section
        className="text-block"
        key={`${item.positions &&
          item.positions.map(pos => pos.position).join('')}`}
      >
        {item.positions && (
          <div>
            {'Edited at positions '}
            {item.positions.map(position => (
              <span key={position.position}>
                {position.position}{' '}
                <UniProtEvidenceTag evidences={position.evidences} />
              </span>
            ))}
          </div>
        )}
        {item.note && (
          <div>
            {item.note.texts.map(text => (
              <span key={text.value}>
                {text.value}{' '}
                {text.evidences && (
                  <UniProtEvidenceTag evidences={text.evidences} />
                )}
              </span>
            ))}
          </div>
        )}
      </section>
    ))}
  </Fragment>
);

export const IsoformView: React.FC<{
  alternativeProducts: AlternativeProductsComment;
  canonicalComponent?: JSX.Element;
  includeSequences?: boolean;
  canonicalAccession: string;
}> = ({
  alternativeProducts,
  canonicalComponent,
  includeSequences = true,
  canonicalAccession,
}) => {
  let isoformCountNode;
  const { isoforms, events } = alternativeProducts;
  if (isoforms && events) {
    isoformCountNode = (
      <p>
        {`This entry describes `}
        <strong>{isoforms.length}</strong>
        {` isoforms produced by `}
        <strong>{events.join(' & ')}</strong>.
      </p>
    );
  }

  let notesNode;
  const texts = idx(alternativeProducts, o => o.note.texts);
  if (texts) {
    notesNode = <p>{texts.map(text => text.value).join(' ')}</p>;
  }

  let isoformsNode;
  if (isoforms) {
    isoformsNode = isoforms.map(isoform => {
      const isoformComponent = (
        <SequenceInfo isoformId={isoform.isoformIds[0]} />
      );
      return (
        <Fragment key={isoform.isoformIds.join('')}>
          <IsoformInfo
            isoformData={isoform}
            canonicalAccession={canonicalAccession}
          />
          {includeSequences && (
            <Fragment>
              {canonicalComponent &&
              isoform.isoformSequenceStatus === 'Displayed'
                ? canonicalComponent
                : isoformComponent}
            </Fragment>
          )}
        </Fragment>
      );
    });
  }
  return (
    <Fragment>
      {isoformCountNode}
      {notesNode}
      {isoformsNode}
    </Fragment>
  );
};

const SequenceView: React.FC<SequenceViewProps> = ({ accession, data }) => {
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
      isoformId={accession}
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

  return (
    <Fragment>
      <InfoList infoData={sequenceInfoData} />
      <IsoformView
        alternativeProducts={data.alternativeProducts}
        canonicalComponent={canonicalComponent}
        canonicalAccession={accession}
      />
    </Fragment>
  );
};

export default SequenceView;
