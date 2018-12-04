import fetchData from '../../utils/fetchData';
import { getUniProtQueryUrl } from '../../utils/apiUrls';
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

export const fetchResults = (query, columns) => (dispatch) => {
  const uniprotQueryString = createQueryString(query);
  dispatch(fetchResultsStarted());
  fetchData(getUniProtQueryUrl(uniprotQueryString, columns))
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => console.error(error));
};
