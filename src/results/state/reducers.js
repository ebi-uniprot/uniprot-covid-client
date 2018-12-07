import { FETCH_RESULTS_STARTED, FETCH_RESULTS_SUCCESS } from './actions';

const results = (state = [], action) => {
  switch (action.type) {
    case FETCH_RESULTS_STARTED:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.data.results,
        lastUpdated: action.receivedAt,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default results;
