import React, { Fragment } from 'react';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { EvidenceType } from './types/modelTypes';
import { v1 } from 'uuid';
import CommentType from './types/commentType';

export type FreeTextType =
  | CommentType.DOMAIN
  | CommentType.FUNCTION
  | CommentType.INDUCTION
  | CommentType.MISCELLANEOUS
  | CommentType.PATHWAY
  | CommentType.PTM
  | CommentType.SIMILARITY
  | CommentType.SUBUNIT
  | CommentType.TISSUE_SPECIFICITY;

export type FreeTextData = {
  comments?: [
    {
      commentType: FreeTextType;
      texts: [{ value: string; evidences: EvidenceType[] }];
    }
  ];
};

type FreeTextProps = {
  data: FreeTextData;
  type: FreeTextType;
  includeTitle?: boolean;
};

export const FreeText: React.FC<FreeTextProps> = ({
  data,
  type,
  includeTitle = false,
}) => {
  if (!data.comments || !data.comments.some(d => d.commentType === type)) {
    return null;
  }
  const freeTextData = data.comments
    .filter(d => d.commentType === type)
    .map((item, i) => (
      <p key={`freetext_${i}_${type}`}>
        {item.texts.map((itemText, j) => {
          return (
            <Fragment key={`freetext_${i}_${type}_${j}`}>
              {itemText.value}
              {itemText.evidences &&
                itemText.evidences.map(evidence => (
                  <UniProtEvidenceTag evidence={evidence} key={v1()} />
                ))}
            </Fragment>
          );
        })}
      </p>
    ));

  if (!freeTextData) {
    return null;
  }

  return (
    <Fragment>
      {includeTitle && (
        <h4 style={{ textTransform: 'capitalize' }}>{type.toLowerCase()}</h4>
      )}
      {freeTextData}
    </Fragment>
  );
};
