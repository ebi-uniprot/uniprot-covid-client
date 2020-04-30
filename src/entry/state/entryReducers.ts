import { ActionType } from 'typesafe-actions';
import * as entryActions from './entryActions';
import entryInitialState, { EntryState } from './entryInitialState';

export type EntryAction = ActionType<typeof entryActions>;

const entryReducers = (
  state: EntryState = entryInitialState,
  action: EntryAction
) => {
  switch (action.type) {
    case entryActions.REQUEST_ENTRY_PUBLICATIONS:
      return {
        ...state,
        publicationsData: {
          ...state.publicationsData,
          isFetching: true,
        },
      };
    case entryActions.RECEIVE_ENTRY_PUBLICATIONS:
      return {
        ...state,
        publicationsData: {
          data: action.payload.reset
            ? action.payload.data.results
            : [...state.publicationsData.data, ...action.payload.data.results],
          facets: action.payload.data.facets,
          isFetching: false,
          nextUrl: action.payload.nextUrl || '',
          total: parseInt(action.payload.total, 10),
        },
      };
    case entryActions.RESET_ENTRY_PUBLICATIONS:
      return {
        ...state,
        publicationsData: {
          data: [],
          facets: [],
          nextUrl: '',
          total: 0,
          isFetching: false,
        },
      };
    default:
      return state;
  }
};

export default entryReducers;
