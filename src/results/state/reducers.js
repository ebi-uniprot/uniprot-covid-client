import { combineReducers } from 'redux';
import { FETCH_RESULTS, FETCH_RESULTS_SUCCESS } from './actions';

const search = (state = [], action) => {
  switch (action.type) {
    case FETCH_RESULTS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        lastUpdated: action.receivedAt,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  search,
});
