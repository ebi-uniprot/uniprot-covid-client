import fetchData from '../../utils/fetchData';
import { getAPIQueryUrl } from '../utils/utils';

export const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_STARTED';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const TOGGLE_FACET = 'TOGGLE_FACET';
export const ADD_FACET = 'ADD_FACET';
export const REMOVE_FACET = 'REMOVE_FACET';
export const ADD_FACETS_TO_QUERY_STRING = 'ADD_FACETS_TO_QUERY_STRING';

export const fetchResultsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});

export const fetchResultsRequest = () => ({
  type: FETCH_RESULTS_REQUEST,
});

export const shouldFetchResults = (state, queryString) => {
  const { queryString: prevQueryString } = state.results;
  return prevQueryString !== queryString;
};

export const fetchResults = (queryString: string, columns: [], selectedFacets: {}) => (dispatch) => {
  dispatch(fetchResultsRequest());
  fetchData(getAPIQueryUrl(queryString, columns, selectedFacets))
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => console.error(error));
};

// export const fetchResultsIfNeeded = (queryString, columns, selectedFacets) => (dispatch, getState) => {
//   if (shouldFetchResults(getState(), queryString)) {
//     dispatch(fetchResults(queryString, columns));
//   }
// };

export const addFacet = (facetName, facetValue) => ({
  type: ADD_FACET,
  facet: {
    name: facetName,
    value: facetValue,
  },
});

export const removeFacet = (facetName, facetValue) => ({
  type: REMOVE_FACET,
  facet: {
    name: facetName,
    value: facetValue,
  },
});

export const updateQueryStringWithFacets = () => ({
  type: ADD_FACETS_TO_QUERY_STRING,
});
