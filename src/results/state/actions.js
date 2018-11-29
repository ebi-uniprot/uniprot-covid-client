import fetchData from '../../utils/fetchData';
import apiUrls from '../../utils/apiUrls';
import { createQueryString } from './utils/QueryStringGenerator';

export const FETCH_RESULTS = 'FETCH_RESULTS';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';

export const fetchSearchTermsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});

export const fetchSearchTerms = query => (dispatch) => {
  const queryString = createQueryString(query);
  // TODO we need to use something better to handle url params
  fetchData(`${apiUrls.advanced_search_terms}/?${queryString}`)
    .then(response => dispatch(fetchSearchTermsSuccess(response.data)))
    .catch(error => throw error);
};
