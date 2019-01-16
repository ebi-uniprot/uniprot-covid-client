import fetchData from '../../utils/fetchData';
import { getUniProtQueryUrl } from '../../utils/apiUrls';

export const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_STARTED';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const TOGGLE_FACET = 'TOGGLE_FACET';
export const ADD_FACETS_TO_QUERY_STRING = 'ADD_FACETS_TO_QUERY_STRING';
export const UPDATE_QUERY_STRING = 'UPDATE_QUERY_STRING';

export const fetchResultsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});

export const fetchResultsRequest = () => ({
  type: FETCH_RESULTS_REQUEST,
});

export const updateQueryString = queryString => ({
  type: UPDATE_QUERY_STRING,
  queryString,
});

export const shouldFetchResults = (state, queryString) => {
  const { queryString: prevQueryString } = state.results;
  return prevQueryString !== queryString;
};

export const fetchResults = (queryString, columns) => (dispatch) => {
  dispatch(updateQueryString(queryString));
  dispatch(fetchResultsRequest());
  fetchData(getUniProtQueryUrl(queryString, columns))
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => console.error(error));
};

export const fetchResultsIfNeeded = (queryString, columns) => (dispatch, getState) => {
  if (shouldFetchResults(getState(), queryString)) {
    dispatch(fetchResults(queryString, columns));
  }
};

export const toggleFacet = (facetName, facetValue) => ({
  type: TOGGLE_FACET,
  facetName,
  facetValue,
});

export const updateQueryStringWithFacets = () => ({
  type: ADD_FACETS_TO_QUERY_STRING,
});
