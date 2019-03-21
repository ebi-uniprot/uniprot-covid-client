import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
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

export const receiveResults = (
  url: string,
  data: any,
  nextUrl: string | null,
  totalNumberResults: number,
  nextPage: boolean
) =>
  action(RECEIVE_RESULTS, {
    url,
    data,
    receivedAt: Date.now(),
    nextUrl,
    totalNumberResults,
    nextPage,
  });

export const requestResults = (url: string) => action(REQUEST_RESULTS, { url });

/*
  queryString: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortBy: SortableColumns | undefined,
  sortDirection: keyof SortDirectionsType | undefined
*/

const getNextUrlFromResponse = (link: string) => {
  const re = /<([0-9a-zA-Z$\-_.+!*'(),?\/:=&%]+)>; rel="next"/;
  const match = re.exec(link);
  return match && match[1];
};

export const fetchResults = (url: string, nextPage: boolean) => async (
  dispatch: Dispatch
) => {
  dispatch(requestResults(url));
  fetchData(url).then(response => {
    dispatch(
      receiveResults(
        url,
        response.data,
        getNextUrlFromResponse(response.headers.link),
        response.headers['x-totalrecords'],
        nextPage
      )
    );
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
  nextPage: boolean = false
) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchResults(url, getState())) {
    dispatch(fetchResults(url, nextPage));
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
