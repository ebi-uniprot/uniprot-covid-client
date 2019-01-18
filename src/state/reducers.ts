import { combineReducers, Action } from 'redux';
import { UPDATE_QUERY_STRING } from '../search/state/actions';
import query from '../search/state/reducers';
import results from '../results/state/reducers';

const combinedReducer = combineReducers({
  query,
  results,
});

const crossSliceReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_QUERY_STRING: {
      return {
        query: state.query,
        results: { ...state.results, queryString: action.payload.queryString },
      };
    }
    default:
      return state;
  }
};

const rootReducer = (state, action) => {
  const intermediateState = combinedReducer(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};

export default rootReducer;
