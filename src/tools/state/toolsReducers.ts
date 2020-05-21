import { ActionType } from 'typesafe-actions';
import * as toolsActions from './toolsActions';
import entryInitialState, { ToolsState } from './toolsInitialState';

export type ToolsAction = ActionType<typeof toolsActions>;

const toolsReducers = (
  state: ToolsState = entryInitialState,
  action: ToolsAction
) => {
  switch (action.type) {
    // add job
    case toolsActions.CREATE_JOB:
      return {
        ...state,
        [action.job.internalID]: action.job,
      };
    // remove job
    case toolsActions.DELETE_JOB:
      // eslint-disable-next-line no-case-declarations
      const { [action.id]: _, ...newState } = state;
      return newState;
    // update job
    case toolsActions.UPDATE_JOB:
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

export default toolsReducers;
