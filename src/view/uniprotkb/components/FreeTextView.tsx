import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
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
  texts: [{ value: string; evidences: Evidence[] }];
}[];

type FreeTextProps = {
  comments?: FreeTextData;
  includeTitle?: boolean;
};

const FreeTextView: React.FC<FreeTextProps> = ({
  comments,
  includeTitle = false,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const freeTextData = comments.map(item => (
    <p key={v1()}>
      {item.texts.map(itemText => {
        return (
          <Fragment key={v1()}>
            {itemText.value}
            {itemText.evidences && (
              <UniProtEvidenceTag evidences={itemText.evidences} key={v1()} />
            )}
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
