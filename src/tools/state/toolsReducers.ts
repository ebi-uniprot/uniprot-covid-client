import { ActionType } from 'typesafe-actions';
import { v1 } from 'uuid';

import { CreatedJob } from '../blast/types/blastJob';
import { Status } from '../blast/types/blastStatuses';

import * as toolsActions from './toolsActions';
import entryInitialState, { ToolsState } from './toolsInitialState';

export type ToolsAction = ActionType<typeof toolsActions>;

const toolsReducers = (
  state: ToolsState = entryInitialState,
  action: ToolsAction
) => {
  switch (action.type) {
    // add job
    case toolsActions.CREATE_JOB: {
      const now = Date.now();
      const newJob: CreatedJob = {
        status: Status.CREATED,
        internalID: `local-${v1()}`,
        title: 'some title',
        type: action.payload.jobType,
        parameters: action.payload.parameters,
        timeCreated: now,
        timeLastUpdate: now,
      };

      return { ...state, [newJob.internalID]: newJob };
    }

    // remove job
    case toolsActions.DELETE_JOB: {
      const { [action.payload.id]: _jobToRemove, ...newState } = state;

      return newState;
    }

    // update job
    case toolsActions.UPDATE_JOB:
      return { ...state, [action.payload.job.internalID]: action.payload.job };

    // update job title
    case toolsActions.UPDATE_JOB_TITLE: {
      const updatedJob = {
        ...state[action.payload.id],
        title: action.payload.title,
      };

      return { ...state, [action.payload.id]: updatedJob };
    }

    default:
      return state;
  }
};

export default toolsReducers;
