import { array } from 'prop-types';
import { ActionType } from 'typesafe-actions';
import * as resultsActions from './actions';
import initialState, { ResultsState } from './initialState';
import { SortDirections, SortDirectionsType } from '../types/resultsTypes';

export type ResultAction = ActionType<typeof resultsActions>;
// SortDirections.ascend.app as keyof SortDirectionsType
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
    case resultsActions.FETCH_RESULTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case resultsActions.FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.payload.data.results,
        facets: action.payload.data.facets,
        lastUpdated: action.payload.receivedAt,
        isFetching: false,
      };
    case resultsActions.ADD_FACET: {
      return {
        ...state,
        selectedFacets: [
          ...state.selectedFacets.slice(0, state.selectedFacets.length),
          action.payload.facet,
        ],
      };
    }
    case resultsActions.REMOVE_FACET: {
      const index = state.selectedFacets.findIndex(
        selectedFacet =>
          action.payload.facet.name === selectedFacet.name &&
          action.payload.facet.value === selectedFacet.value
      );
      return {
        ...state,
        selectedFacets: [
          ...state.selectedFacets.slice(0, index),
          ...state.selectedFacets.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};

export default results;
