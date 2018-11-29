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
  const queryString = createQueryString(query);
  dispatch(fetchResultsStarted());
  // TODO we need to use something better to handle url params
  fetchData(`${apiUrls.advanced_search_terms}/?${queryString}`)
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => throw error);
};
