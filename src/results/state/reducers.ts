import { ActionType } from 'typesafe-actions';
import * as resultsActions from './actions';
import initialState, { ResultsState } from './initialState';

export type ResultAction = ActionType<typeof resultsActions>;
const results = (state: ResultsState = initialState, action: ResultAction) => {
  switch (action.type) {
    case resultsActions.REQUEST_BATCH_OF_RESULTS:
      return {
        ...state,
        isFetching: true,
      };
    case resultsActions.RECEIVE_BATCH_OF_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.payload.data.results],
        facets: action.payload.data.facets,
        lastUpdated: action.payload.receivedAt,
        totalNumberResults: action.payload.totalNumberResults,
        isFetching: false,
        isFetched: {
          ...state.isFetched,
          [action.payload.url]: true,
        },
        nextUrl: action.payload.nextUrl || '',
      };
    case resultsActions.CLEAR_RESULTS: {
      return {
        ...state,
        results: [],
        isFetching: false,
        isFetched: {},
      };
    }
    default:
      return state;
  }
};

export default results;