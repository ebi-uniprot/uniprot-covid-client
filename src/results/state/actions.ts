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

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const TOGGLE_FACET = 'TOGGLE_FACET';
export const ADD_FACET = 'ADD_FACET';
export const REMOVE_FACET = 'REMOVE_FACET';
export const ADD_FACETS_TO_QUERY_STRING = 'ADD_FACETS_TO_QUERY_STRING';
export const UPDATE_COLUMN_SORT = 'UPDATE_COLUMN_SORT';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export const receiveResults = (
  url: string,
  data: any,
  nextUrl: string,
  totalNumberResults: number,
  isNextPage: boolean
) =>
  action(RECEIVE_RESULTS, {
    url,
    data,
    receivedAt: Date.now(),
    nextUrl,
    totalNumberResults,
    isNextPage,
  });

export const requestResults = (url: string) => action(REQUEST_RESULTS, { url });

/*
  queryString: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortBy: SortableColumns | undefined,
  sortDirection: keyof SortDirectionsType | undefined
*/

const getNextUrlFromResponse = (link: string | null) => {
  if (!link) {
    return;
  }
  const re = /<([0-9a-zA-Z$\-_.+!*'(),?\/:=&%]+)>; rel="next"/;
  const match = re.exec(link);
  return match && match[1];
};

export const clearResults = () => action(CLEAR_RESULTS);

export const fetchResults = (url: string, isNextPage: boolean) => async (
  dispatch: Dispatch
) => {
  if (!isNextPage) {
    dispatch(clearResults());
  }
  dispatch(requestResults(url));
  fetchData(url).then(response => {
    const nextUrl = getNextUrlFromResponse(idx(response, _ => _.headers.link));
    if (nextUrl) {
      dispatch(
        receiveResults(
          url,
          response.data,
          nextUrl,
          response.headers['x-totalrecords'],
          isNextPage
        )
      );
    }
  });
  // .catch(error => console.error(error)); // the console creates a tslint ...
  // ... error but we want to catch this in the future
};

export const shouldFetchResults = (url: string, state: RootState) => {
  const { isFetching, isFetched } = state.results;
  return !isFetching[url] && !isFetched[url];
};

export const fetchResultsIfNeeded = (
  url: string | undefined,
  isNextPage: boolean = false
) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchResults(url, getState())) {
    dispatch(fetchResults(url, isNextPage));
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
