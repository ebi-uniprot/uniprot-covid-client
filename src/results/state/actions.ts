import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
import idx from 'idx';
import { ResultsState } from './initialState';
import {
  SelectedFacet,
  SortDirectionsType,
  SortableColumns,
} from '../types/resultsTypes';
import { RootState } from '../../state/state-types';

export const REQUEST_BATCH_OF_RESULTS = 'REQUEST_BATCH_OF_RESULTS';
export const RECEIVE_BATCH_OF_RESULTS = 'RECEIVE_BATCH_OF_RESULTS';
export const TOGGLE_FACET = 'TOGGLE_FACET';
export const ADD_FACET = 'ADD_FACET';
export const REMOVE_FACET = 'REMOVE_FACET';
export const ADD_FACETS_TO_QUERY_STRING = 'ADD_FACETS_TO_QUERY_STRING';
export const UPDATE_COLUMN_SORT = 'UPDATE_COLUMN_SORT';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export const receiveBatchOfResults = (
  url: string,
  data: any,
  nextUrl: string | undefined,
  totalNumberResults: number
) =>
  action(RECEIVE_BATCH_OF_RESULTS, {
    url,
    data,
    receivedAt: Date.now(),
    nextUrl,
    totalNumberResults,
  });

export const requestBatchOfResults = (url: string) =>
  action(REQUEST_BATCH_OF_RESULTS, { url });

/*
  queryString: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortBy: SortableColumns | undefined,
  sortDirection: keyof SortDirectionsType | undefined
*/

const getNextUrlFromResponse = (link: string | null): string | undefined => {
  if (!link) {
    return;
  }
  const re = /<([0-9a-zA-Z$\-_.+!*'(),?\/:=&%]+)>; rel="next"/;
  const match = re.exec(link);
  if (match) {
    return match[1];
  }
};

export const clearResults = () => action(CLEAR_RESULTS);

export const fetchBatchOfResults = (url: string) => async (
  dispatch: Dispatch
) => {
  dispatch(requestBatchOfResults(url));
  fetchData(url).then(response => {
    const nextUrl = getNextUrlFromResponse(idx(response, _ => _.headers.link));
    dispatch(
      receiveBatchOfResults(
        url,
        response.data,
        nextUrl,
        response.headers['x-totalrecords']
      )
    );
  });
  // .catch(error => console.error(error)); // the console creates a tslint ...
  // ... error but we want to catch this in the future
};

export const shouldFetchBatchOfResults = (url: string, state: RootState) => {
  const { isFetching, isFetched } = state.results;
  return !isFetching[url] && !isFetched[url];
};

export const fetchBatchOfResultsIfNeeded = (url: string | undefined) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchBatchOfResults(url, getState())) {
    dispatch(fetchBatchOfResults(url));
  }
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
