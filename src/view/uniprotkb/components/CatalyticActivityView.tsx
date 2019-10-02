import React, { Fragment, useState } from 'react';
import '@swissprot/rhea-reaction-visualizer';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
import Comment from '../../../model/types/Comment';

const getRheaId = (referenceId: string) => {
  const reRhea = /^RHEA:(\d+)$/;
  const match = referenceId.match(reRhea);
  return match && match[1];
};

const isRhea = ({ databaseType, id }) =>
  databaseType === 'Rhea' && getRheaId(id);

const RheaReactionVisualizer = ({ rheaId, show: initialShow }) => {
  const [show, setShow] = useState(initialShow);
  return (
    <Fragment>
      <button
        type="button"
        className="button secondary"
        onClick={() => setShow(!show)}
      >
        {`${show ? 'Hide' : 'View'} Rhea reaction`}
      </button>
      {show && <rhea-reaction rheaid={rheaId} zoom showids />}
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
              <RheaReactionVisualizer
                rheaId={rheaId}
                show={rheaReactionCount === 1}
              />
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default CatalyticActivityView;
