import React, { Fragment, useState } from 'react';
import '@swissprot/rhea-reaction-visualizer';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
import Comment from '../../../model/types/Comment';

const getRheaId = (referenceId: string) => {
  const reRhea = /^RHEA:(\d+)$/;
  const match = referenceId.match(reRhea);
  if (match && match[1]) {
    return match[1];
  }
};
const isRhea = ({ databaseType, id }) =>
  databaseType === 'Rhea' && getRheaId(id);

const RheaReaction = ({ rheaid, viewViz: initialViewViz }) => {
  const [viewViz, setViewViz] = useState(initialViewViz);
  return (
    <Fragment>
      <button
        type="button"
        className="button secondary"
        onClick={() => setViewViz(!viewViz)}
      >
        {`${viewViz ? 'Hide' : 'View'} Rhea reaction`}
      </button>
      {viewViz && <rhea-reaction rheaid={rheaid} zoom showids />}
    </Fragment>
  );
};

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
  let rheaReactionCount = 0;
  return (
    <Fragment>
      <h4>Catalytic Activity</h4>
      {comments.map(catalyticActivity => {
        if (!catalyticActivity.reaction) {
          return null;
        }
        const rheaReactionReferences = catalyticActivity.reaction.reactionReferences.filter(
          isRhea
        );
        const rheaId =
          rheaReactionReferences.length > 0 &&
          getRheaId(rheaReactionReferences[0].id);
        rheaReactionCount += +!!rheaId;
        return (
          <Fragment key={catalyticActivity.reaction.name}>
            <span className="text-block">
              <strong>{catalyticActivity.reaction.ecNumber}</strong>
              {` ${catalyticActivity.reaction.name}`}
              {catalyticActivity.reaction.evidences && (
                <UniProtEvidenceTag
                  evidences={catalyticActivity.reaction.evidences}
                />
              )}
            </span>
            {!!rheaId && (
              <RheaReaction rheaid={rheaId} viewViz={rheaReactionCount === 1} />
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default CatalyticActivityView;
