import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import {
  FreeTextComment,
  TextWithEvidence,
} from '../../../model/types/CommentTypes';

type FreeTextProps = {
  comments?: FreeTextComment[];
  title?: string;
};

export const TextView: React.FC<{ comments: TextWithEvidence[] }> = ({
  comments,
}) => (
  <section className="text-block" key={v1()}>
    {comments.map(comment => (
      <Fragment key={v1()}>
        {comment.value}
        {comment.evidences && (
          <UniProtEvidenceTag evidences={comment.evidences} />
        )}
      </Fragment>
    ))}
  </section>
);

const FreeTextView: React.FC<FreeTextProps> = ({ comments, title }) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const freeTextData = comments.map(
    item => item.texts && <TextView comments={item.texts} key={v1()} />
  );

  return (
    <Fragment>
      {title && <h4 style={{ textTransform: 'capitalize' }}>{title}</h4>}
      {freeTextData}
    </Fragment>
  );
};

export default FreeTextView;