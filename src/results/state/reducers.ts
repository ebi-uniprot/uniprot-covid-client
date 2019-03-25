import { array } from 'prop-types';
import { ActionType } from 'typesafe-actions';
import queryString from 'query-string';
import * as resultsActions from './actions';
import initialState, { ResultsState } from './initialState';
import { SortDirections, SortDirectionsType } from '../types/resultsTypes';

// const isSameSearch = (urls, newUrl) => {
//   if (urls.length === 0) {
//     return true;
//   }
//   const currentUrl = urls[0].url;
//   const currentParams = queryString.parse(currentUrl);
//   const newParams = queryString.parse(newUrl);
//   console.log(currentParams, newParams);
//   const fieldsToCheck = ['fields', 'includeFacets', 'query'];
//   return fieldsToCheck.every(field => {
//     console.log(currentParams[field], newParams[field]);
//     return currentParams[field] === newParams[field];
//   });
// };

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
    case resultsActions.REQUEST_BATCH_OF_RESULTS:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.url]: true,
        },
      };
    case resultsActions.RECEIVE_BATCH_OF_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.payload.data.results],
        facets: action.payload.data.facets,
        lastUpdated: action.payload.receivedAt,
        totalNumberResults: action.payload.totalNumberResults,
        isFetching: {
          ...state.isFetching,
          [action.payload.url]: false,
        },
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
        isFetching: {},
        isFetched: {},
      };
    }
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
