import React, { FC, Fragment } from 'react';
import CommentType from '../../../model/types/CommentType';

enum InteractionType {
  SELF = 'SELF',
  XENO = 'XENO',
  BINARY = 'BINARY',
  // Are there others?
}

type Interaction = {
  firstInteractor: string;
  numberOfExperiments: number;
  secondInteractor: string;
  type: InteractionType;
  geneName?: string;
  uniProtAccession?: string;
};

export type InteractionComment = {
  commentType: CommentType;
  interactions: Interaction[];
};

const InteractionView: FC<{}> = () => <Fragment />;

export default InteractionView;
