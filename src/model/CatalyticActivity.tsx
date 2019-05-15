import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { EvidenceType } from './types/modelTypes';
import { FreeTextType } from './FreeText';

export type CatalyticActivityData = {
  commentType: FreeTextType;
  reaction: {
    name: string;
    reactionReferences: Array<{ databaseType: string; id: string }>;
    ecNumber: string;
    evidences?: EvidenceType[];
  };
}[];

type CatalyticActivityProps = {
  comments: CatalyticActivityData;
};

export const CatalyticActivity: React.FC<CatalyticActivityProps> = ({
  comments,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  return (
    <Fragment>
      <h4>Catalytic Activity</h4>
      {comments.map(catalyticActivity => (
        <p key={v1()}>
          <strong>{catalyticActivity.reaction.ecNumber}</strong>{' '}
          {catalyticActivity.reaction.name}
          {catalyticActivity.reaction.evidences &&
            catalyticActivity.reaction.evidences.map(evidence => (
              <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
            ))}
        </p>
      ))}
    </Fragment>
  );
};
