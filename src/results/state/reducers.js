import { REQUEST_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS, UPDATE_QUERY_STRING } from './actions';

const results = (state = [], action) => {
  switch (action.type) {
    case UPDATE_QUERY_STRING:
      return {
        ...state,
        queryString: action.queryString,
      };
    case REQUEST_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        data: action.data.results,
        lastUpdated: action.receivedAt,
        encodedQueryString: action.encodedQueryString,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default results;
