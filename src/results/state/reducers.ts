import { ActionType } from 'typesafe-actions';
import * as resultsActions from './actions';
import initialState, { ResultsState } from './initialState';
import { SortDirections, SortDirectionsType } from '../types/resultsTypes';

export type ResultAction = ActionType<typeof resultsActions>;
const results = (state: ResultsState = initialState, action: ResultAction) => {
  switch (action.type) {
    case resultsActions.UPDATE_COLUMN_SORT:
      return {
        ...state,
        sort: {
          column: action.payload.column,
          direction:
            state.sort.column === action.payload.column &&
            state.sort.direction === SortDirections.ascend.app
              ? (SortDirections.descend.app as keyof SortDirectionsType)
              : (SortDirections.ascend.app as keyof SortDirectionsType),
        },
      };
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
