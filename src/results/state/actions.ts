import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import fetchData from '../../utils/fetchData';
import { getAPIQueryUrl } from '../utils/utils';
import { ResultsState } from './initialState';
import {
  SelectedFacet,
  SortDirectionsType,
  SortableColumns,
} from '../types/resultsTypes';

export const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_STARTED';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const TOGGLE_FACET = 'TOGGLE_FACET';
export const ADD_FACET = 'ADD_FACET';
export const REMOVE_FACET = 'REMOVE_FACET';
export const ADD_FACETS_TO_QUERY_STRING = 'ADD_FACETS_TO_QUERY_STRING';
export const UPDATE_COLUMN_SORT = 'UPDATE_COLUMN_SORT';

export const fetchResultsSuccess = (data: any) =>
  action(FETCH_RESULTS_SUCCESS, {
    data,
    receivedAt: Date.now(),
  });

export const fetchResultsRequest = () => action(FETCH_RESULTS_REQUEST);

export const fetchResults = (
  queryString: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortBy: SortableColumns | undefined,
  sortDirection: keyof SortDirectionsType | undefined
) => async (dispatch: Dispatch) => {
  dispatch(fetchResultsRequest());
  fetchData(
    getAPIQueryUrl(queryString, columns, selectedFacets, sortBy, sortDirection)
  ).then(response => dispatch(fetchResultsSuccess(response.data)));
  // .catch(error => console.error(error)); // the console creates a tslint ...
  // ... error but we want to catch this in the future
};

export const addFacet = (facetName: string, facetValue: string) =>
  action(ADD_FACET, {
    facet: {
      name: facetName,
      value: facetValue,
    },
  });

export const removeFacet = (facetName: string, facetValue: string) =>
  action(REMOVE_FACET, {
    facet: {
      name: facetName,
      value: facetValue,
    },
  });

export const updateQueryStringWithFacets = () =>
  action(ADD_FACETS_TO_QUERY_STRING);

export const updateColumnSort = (column: SortableColumns) =>
  action(UPDATE_COLUMN_SORT, { column });
