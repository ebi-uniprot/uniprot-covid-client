import fetchData from '../../utils/fetchData';
import { getUniProtQueryUrl } from '../../utils/apiUrls';

export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export const receiveSearchResults = (data, encodedQueryString) => ({
  type: RECEIVE_SEARCH_RESULTS,
  data,
  encodedQueryString,
  receivedAt: Date.now(),
});

export const requestSearchResults = () => ({
  type: REQUEST_SEARCH_RESULTS,
});

export const shouldFetchSearchResults = (state, encodedQueryString) => {
  const { encodedQueryString: prevEncodedQueryString, isFetching } = state.results;
  return !isFetching && prevEncodedQueryString !== encodedQueryString;
};

export const fetchSearchResults = (encodedQueryString, columns) => (dispatch) => {
  dispatch(requestSearchResults());
  fetchData(getUniProtQueryUrl(encodedQueryString, columns))
    .then(response => dispatch(receiveSearchResults(response.data, encodedQueryString)))
    .catch(error => console.error(error));
};

export const fetchSearchResultsIfNeeded = (encodedQueryString, columns) => (dispatch, getState) => {
  if (shouldFetchSearchResults(getState(), encodedQueryString)) {
    dispatch(fetchSearchResults(encodedQueryString, columns));
  }
};
