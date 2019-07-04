import React, { FC, Fragment } from 'react';
import { UniProtkbAPIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import idx from 'idx';
import './styles/UniProtCard.scss';

const UniProtCard: FC<{ data: UniProtkbAPIModel }> = ({ data }) => {
  // console.log(data);
  const recommendedName = idx(
    data,
    _ => _.proteinDescription.recommendedName.fullName.value
  );
  const organismName = idx(data, _ => _.organism.scientificName);
  return (
    <div className="uniprot-card">
      <h5>
        {data.primaryAccession} {data.uniProtId}
      </h5>
      <p>
        {recommendedName} <a href="#">{organismName}</a>
      </p>
      <p className="uniprot-card__comment">
        {data.comments &&
          data.comments.map(
            comment => comment.texts && comment.texts.map(text => text.value)
          )}
      </p>
    </div>
  );
};

export default UniProtCard;
