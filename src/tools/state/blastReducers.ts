import { ActionType } from 'typesafe-actions';
import * as blastActions from './blastActions';
import entryInitialState, { BlastState } from './blastInitialState';

export type BlastAction = ActionType<typeof blastActions>;

const blastReducers = (
  state: BlastState = entryInitialState,
  action: BlastAction
) => {
  switch (action.type) {
    // add job
    case blastActions.CREATE_JOB:
      return {
        ...state,
        [action.job.internalID]: action.job,
      };
    // remove job
    case blastActions.REMOVE_JOB:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: _, ...newState } = state;
      return newState;
    // update job
    case blastActions.UPDATE_JOB:
      return { ...state, [action.job.internalID]: action.job };

    // case blastActions.RECEIVE_BLAST_JOB_ID:
    //   return {
    //     ...state,
    //     jobs: [...state.jobs, { jobId: action.payload.jobId }],
    //   };
    // case blastActions.RECEIVE_BLAST_RESULTS:
    //   return {
    //     ...state,
    //     jobs: [
    //       ...state.jobs.map(job => {
    //         if (job.jobId === action.payload.jobId) {
    //           return { ...job, data: action.payload.data };
    //         }
    //         return job;
    //       }),
    //     ],
    //   };
    default:
      return state;
  }
};

export default blastReducers;
