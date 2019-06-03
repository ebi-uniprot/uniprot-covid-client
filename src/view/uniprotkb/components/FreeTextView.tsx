import React, { Fragment } from 'react';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { EvidenceType } from '../../../model/types/modelTypes';
import { v1 } from 'uuid';
import Comment from '../../../model/types/Comment';

export type FreeTextType =
  | Comment.DISRUPTION_PHENOTYPE
  | Comment.DOMAIN
  | Comment.FUNCTION
  | Comment.INDUCTION
  | Comment.MISCELLANEOUS
  | Comment.PATHWAY
  | Comment.PTM
  | Comment.SIMILARITY
  | Comment.SUBUNIT
  | Comment.TISSUE_SPECIFICITY;

export type FreeTextData = {
  commentType: Comment;
  texts: [{ value: string; evidences: EvidenceType[] }];
}[];

type FreeTextProps = {
  comments: FreeTextData;
  includeTitle?: boolean;
};

const FreeTextView: React.FC<FreeTextProps> = ({
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

export default FreeTextView;
