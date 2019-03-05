import React, { Fragment } from 'react';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { EvidenceType } from './types/modelTypes';

type CatalyticActivityData = {
  comments: [
    {
      commentType: string;
      reaction: {
        commentType: string;
        name: string;
        reactionReferences: Array<{ databaseType: string; id: string }>;
        ecNumber: string;
        evidences: EvidenceType[];
      };
    }
  ];
};

type CatalyticActivityProps = {
  data: CatalyticActivityData;
};

export const CatalyticActivity: React.FC<CatalyticActivityProps> = ({
  data,
}) => {
  const catalyticActivityData = data.comments.filter(
    d => d.commentType === 'CATALYTIC ACTIVITY'
  );
  if (!catalyticActivityData || catalyticActivityData.length <= 0) {
    return null;
  }
  return (
    <Fragment>
      <h4>Catalytic Activity</h4>
      {catalyticActivityData.map(catalyticActivity => (
        <p key={`catalytic-${catalyticActivity.reaction.ecNumber}`}>
          <strong>{catalyticActivity.reaction.ecNumber}</strong>{' '}
          {catalyticActivity.reaction.name}
          {catalyticActivity.reaction.evidences.map(evidence => (
            <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
          ))}
        </p>
      ))}
    </Fragment>
  );
};
