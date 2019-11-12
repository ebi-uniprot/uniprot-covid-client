import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { FreeText, TextWithEvidence } from '../../../model/types/CommentTypes';

type FreeTextProps = {
  comments?: FreeText[];
  title?: string;
};

export const TextView: React.FC<{ comments: TextWithEvidence[] }> = ({
  comments,
}) => (
  <Fragment>
    {comments.map(comment => (
      <Fragment key={v1()}>
        {comment.value}
        {comment.evidences && (
          <UniProtEvidenceTag evidences={comment.evidences} />
        )}
      </Fragment>
    ))}
  </Fragment>
);

const FreeTextView: React.FC<FreeTextProps> = ({ comments, title }) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const freeTextData = comments.map(item => (
    <span className="text-block" key={v1()}>
      {item.texts && <TextView comments={item.texts} />}
    </span>
  ));

  return (
    <Fragment>
      {title && <h4 style={{ textTransform: 'capitalize' }}>{title}</h4>}
      {freeTextData}
    </Fragment>
  );
};

export default FreeTextView;
