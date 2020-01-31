import { ActionType } from 'typesafe-actions';
import * as entryActions from './entryActions';
import entryInitialState, { EntryState } from './entryInitialState';

export type EntryAction = ActionType<typeof entryActions>;

const entryReducers = (
  state: EntryState = entryInitialState,
  action: EntryAction
) => {
  switch (action.type) {
    case entryActions.REQUEST_ENTRY:
      return {
        ...state,
        isFetching: true,
      };
    case entryActions.RECEIVE_ENTRY:
      return {
        ...state,
        data: action.payload.data,
        accession: action.payload.accession,
        isFetching: false,
      };
    case entryActions.RESET_ENTRY:
      return {
        ...state,
        data: null,
        accession: null,
      };
    default:
      return state;
  }
};

export default entryReducers;
