import React, { Fragment } from 'react';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { EvidenceType } from './types/modelTypes';
import { v1 } from 'uuid';
import CommentType from './types/commentType';

export type FreeTextType =
  | CommentType.DISRUPTION_PHENOTYPE
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
  commentType: FreeTextType;
  texts: [{ value: string; evidences: EvidenceType[] }];
}[];

type FreeTextProps = {
  comments: FreeTextData;
  includeTitle?: boolean;
};

export const FreeText: React.FC<FreeTextProps> = ({
  comments,
  includeTitle = false,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const freeTextData = comments.map((item, i) => (
    <p key={`freetext_${i}_${item.commentType}`}>
      {item.texts.map((itemText, j) => {
        return (
          <Fragment key={`freetext_${i}_${item.commentType}_${j}`}>
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

  return (
    <Fragment>
      {includeTitle && (
        <h4 style={{ textTransform: 'capitalize' }}>
          {comments[0].commentType.toLowerCase()}
        </h4>
      )}
      {freeTextData}
    </Fragment>
  );
};
