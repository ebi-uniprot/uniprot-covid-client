/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import idx from 'idx';
import { SwissProtIcon, TremblIcon, Bubble } from 'franklin-sites';
import {
  UniProtkbAPIModel,
  EntryType,
} from '../../../model/uniprotkb/UniProtkbConverter';
import './styles/UniProtCard.scss';

const UniProtCard: FC<{ data: UniProtkbAPIModel }> = ({
  data,
}): JSX.Element => {
  const recommendedName = idx(
    data,
    (_): string => _.proteinDescription.recommendedName.fullName.value
  );
  const organismName = idx(data, (_): string => _.organism.scientificName);
  return (
    <div className="uniprot-card">
      <h5>
        {data.entryType === EntryType.SWISSPROT ? (
          <span className="uniprot-card__status icon--reviewed">
            <SwissProtIcon />
          </span>
        ) : (
          <span className="uniprot-card__status icon--unreviewed">
            <TremblIcon />
          </span>
        )}
        <Link to={`/uniprotkb/${data.primaryAccession}`}>
          {data.primaryAccession}
        </Link>
        {' '}
        {data.uniProtId}
      </h5>
      <p>
        {recommendedName && `${recommendedName} · `}
        <a href="#">{organismName}</a>
        {` · ${data.sequence.length} amino-acids`}
        {` · `}
        <Bubble
          value={data.annotationScore}
          size="small"
          title="Annotation score"
        />
      </p>
      {data.genes && (
        <p>
          <strong>Gene: </strong>
          {data.genes.map(gene => gene.geneName && gene.geneName.value)}
        </p>
      )}
      {data.keywords && (
        <p>
          <strong>Keywords:</strong>
          {' '}
          {data.keywords.map(keyword => {
            return (
              <Link to="/" key={keyword.value}>
                {' '}
                #
                {keyword.value}
              </Link>
            );
          })}
        </p>
      )}
    </div>
  );
};

export default UniProtCard;
