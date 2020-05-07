import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { FreeTextComment, TextWithEvidence } from '../../types/commentTypes';

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
          <UniProtKBEvidenceTag evidences={comment.evidences} />
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
    item =>
      item.texts && (
        <Fragment key={v1()}>
          {item.molecule && <h5>{item.molecule}</h5>}
          <TextView comments={item.texts} />
        </Fragment>
      )
  );

  return (
    <Fragment>
      {title && <h3 style={{ textTransform: 'capitalize' }}>{title}</h3>}
      {freeTextData}
    </Fragment>
  );
};

export default FreeTextView;
