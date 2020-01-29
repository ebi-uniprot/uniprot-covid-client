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
      };
    case entryActions.RECEIVE_ENTRY:
      return {
        ...state,
        data: action.payload.data,
        accession: action.payload.accession,
      };
    case entryActions.RESET_ENTRY:
      return {
        ...state,
        data: null,
        accession: null,
        publicationsData: {
          data: [],
          nextUrl: '',
          total: 0,
          isFetching: false,
          isFetched: {},
        },
      };
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
          data: [...state.publicationsData.data, ...action.payload.data],
          isFetching: false,
          isFetched: {
            ...state.publicationsData.isFetched,
            [action.payload.url]: true,
          },
          nextUrl: action.payload.nextUrl ? action.payload.nextUrl : '',
          total: action.payload.total,
          facets: [],
        },
      };
    default:
      return state;
  }
};

export default entryReducers;
