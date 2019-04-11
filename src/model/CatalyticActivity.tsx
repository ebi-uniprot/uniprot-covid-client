import React, { Fragment } from 'react';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { EvidenceType } from './types/modelTypes';
import { FreeTextType } from './FreeText';

type CatalyticActivityData = {
  comments?: [
    {
      commentType: FreeTextType;
      reaction: {
        name: string;
        reactionReferences: Array<{ databaseType: string; id: string }>;
        ecNumber: string;
        evidences?: EvidenceType[];
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
  if (
    !data.comments ||
    !data.comments.some(d => d.commentType === FreeTextType.CATALYTIC_ACTIVITY)
  ) {
    return null;
  }
  const catalyticActivityData = data.comments.filter(
    d => d.commentType === FreeTextType.CATALYTIC_ACTIVITY
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
          {catalyticActivity.reaction.evidences &&
            catalyticActivity.reaction.evidences.map(evidence => (
              <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
            ))}
        </p>
      ))}
    </Fragment>
  );
};