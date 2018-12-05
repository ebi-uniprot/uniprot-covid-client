import fetchData from '../../utils/fetchData';
import { getUniProtQueryUrl } from '../../utils/apiUrls';
import createQueryString from '../utils/QueryStringGenerator';

export const FETCH_RESULTS_STARTED = 'FETCH_RESULTS_STARTED';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';

const TEST_URL = 'http://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/search?query=(organism_name:human)';

export const fetchResultsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});

export const fetchResultsStarted = () => ({
  type: FETCH_RESULTS_STARTED,
});

export const fetchResults = (encodedUniprotQueryString, columns) => (dispatch) => {
  dispatch(fetchResultsStarted());
  // fetchData(getUniProtQueryUrl(encodedUniprotQueryString, columns))
  fetchData(TEST_URL)
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => console.error(error));
};
