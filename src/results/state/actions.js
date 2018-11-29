import queryString from 'query-string';
import urljoin from 'url-join';
import fetchData from '../../utils/fetchData';
import apiUrls from '../../utils/apiUrls';
import createQueryString from '../utils/QueryStringGenerator';

export const FETCH_RESULTS_STARTED = 'FETCH_RESULTS_STARTED';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';

export const fetchResultsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});

export const fetchResultsStarted = () => ({
  type: FETCH_RESULTS_STARTED,
});

export const fetchResults = query => (dispatch) => {
  const uniprotQueryString = createQueryString(query);
  const queryUrl = queryString.stringify({
    query: uniprotQueryString,
  });
  dispatch(fetchResultsStarted());
  fetchData(urljoin(apiUrls.advanced_search_terms, '/?', queryUrl))
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => throw error);
};
