import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
import Comment from '../../../model/types/Comment';

export type CatalyticActivityData = {
  commentType: Comment;
  reaction?: {
    name: string;
    reactionReferences: { databaseType: string; id: string }[];
    ecNumber: string;
    evidences?: Evidence[];
  };
}[];

type CatalyticActivityProps = {
  comments?: CatalyticActivityData;
};

const CatalyticActivityView: React.FC<CatalyticActivityProps> = ({
  comments,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  return (
    <Fragment>
      <h4>Catalytic Activity</h4>
      {comments.map(
        catalyticActivity =>
          catalyticActivity.reaction && (
            <span className="text-block" key={v1()}>
              <strong>{catalyticActivity.reaction.ecNumber}</strong>
              {` ${catalyticActivity.reaction.name}`}
              {catalyticActivity.reaction.evidences && (
                <UniProtEvidenceTag
                  evidences={catalyticActivity.reaction.evidences}
                />
              )}
            </span>
          )
      )}
    </Fragment>
  );
};

export default CatalyticActivityView;
