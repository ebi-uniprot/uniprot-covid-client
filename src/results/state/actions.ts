import fetchData from '../../utils/fetchData';
import { getUniProtQueryUrl } from '../../utils/apiUrls';

export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const TOGGLE_FACET = 'TOGGLE_FACET';
export const ADD_FACETS_TO_QUERY_STRING = 'ADD_FACETS_TO_QUERY_STRING';
export const UPDATE_QUERY_STRING = 'UPDATE_QUERY_STRING';

export const receiveSearchResults = data => ({
  type: RECEIVE_SEARCH_RESULTS,
  data,
  receivedAt: Date.now(),
});

export const requestSearchResults = () => ({
  type: REQUEST_SEARCH_RESULTS,
});

export const updateQueryString = queryString => ({
  type: UPDATE_QUERY_STRING,
  queryString,
});

export const shouldFetchSearchResults = (state, queryString) => {
  const { queryString: prevQueryString } = state.results;
  return prevQueryString !== queryString;
};

export const fetchSearchResults = (queryString, columns) => (dispatch) => {
  dispatch(updateQueryString(decodeURI(queryString)));
  dispatch(requestSearchResults());
  fetchData(getUniProtQueryUrl(encodeURI(queryString), columns))
    .then(response => dispatch(receiveSearchResults(response.data)))
    .catch(error => console.error(error));
};

export const fetchSearchResultsIfNeeded = (queryString, columns) => (dispatch, getState) => {
  console.log(queryString);
  if (shouldFetchSearchResults(getState(), queryString)) {
    dispatch(fetchSearchResults(queryString, columns));
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

export const addFacetToQuery = (facetName, facetValue) => (dispatch) => {
  dispatch(toggleFacet(facetName, facetValue));
  dispatch(updateQueryStringWithFacets());
};
