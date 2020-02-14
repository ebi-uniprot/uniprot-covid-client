import { ActionType } from 'typesafe-actions';
import * as blastActions from './blastActions';
import entryInitialState, { BlastState } from './blastInitialState';

export type BlastAction = ActionType<typeof blastActions>;

const blastReducers = (
  state: BlastState = entryInitialState,
  action: BlastAction
) => {
  switch (action.type) {
    case blastActions.RECEIVE_BLAST_JOB_ID:
      return {
        ...state,
        jobs: [...state.jobs, { jobId: action.payload.jobId }],
      };
    case blastActions.RECEIVE_BLAST_RESULTS:
      return {
        ...state,
        jobs: [...state.jobs, { ...action.payload }],
      };
    default:
      return state;
  }
};

export default blastReducers;
