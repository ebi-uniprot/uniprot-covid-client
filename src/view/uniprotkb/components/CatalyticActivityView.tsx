import React, { Fragment, useState } from 'react';
import '@swissprot/rhea-reaction-visualizer';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
import Comment from '../../../model/types/Comment';
import './styles/CatalyticActivityView.scss';

export const getRheaId = (referenceId: string) => {
  const re = /^RHEA:(\d+)$/;
  const match = referenceId.match(re);
  return match && match[1];
};

export const isRheaReactReference = ({
  databaseType,
  id,
}: {
  databaseType: string;
  id: string;
}) => databaseType === 'Rhea' && !!getRheaId(id);

type RheaReactionVisualizerProps = {
  rheaId: string;
  show: boolean;
};

export const RheaReactionVisualizer: React.FC<RheaReactionVisualizerProps> = ({
  rheaId,
  show: initialShow,
}) => {
  const [show, setShow] = useState(initialShow);
  return (
    <Fragment>
      <button
        type="button"
        className="button link-button rhea-reaction-visualizer__button"
        onClick={() => setShow(!show)}
      >
        {`${show ? 'Hide' : 'View'} Rhea reaction`}
      </button>
      {show && (
        <div className="rhea-reaction-visualizer__component">
          <rhea-reaction rheaid={rheaId} zoom showids />
        </div>
      )}
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
          isRheaReactReference
        );
        const rheaId =
          rheaReactionReferences.length > 0 &&
          getRheaId(rheaReactionReferences[0].id);
        rheaReactionCount += +!!rheaId;
        return (
          <span className="text-block" key={catalyticActivity.reaction.name}>
            <strong>{catalyticActivity.reaction.ecNumber}</strong>
            {` ${catalyticActivity.reaction.name}`}
            {catalyticActivity.reaction.evidences && (
              <UniProtEvidenceTag
                evidences={catalyticActivity.reaction.evidences}
              />
            )}
            {!!rheaId && (
              <RheaReactionVisualizer
                rheaId={rheaId}
                show={rheaReactionCount === 1}
              />
            )}
          </span>
        );
      })}
    </Fragment>
  );
};

export default CatalyticActivityView;
