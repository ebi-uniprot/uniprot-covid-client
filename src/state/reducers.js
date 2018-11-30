import { combineReducers } from 'redux';
import query from '../advanced-search/state/reducers';
import search from '../results/state/reducers';
import COPY_QUERY_OBJECT_TO_RESULTS from './actions';

const copyQueryObjectToResults = (queryState, action, searchState) => {
  console.log(queryState, action, searchState);
  return queryState;
};

const combinedReducer = combineReducers({
  query,
  search,
});

const crossSliceReducer = (state, action) => {
  switch (action.type) {
    case COPY_QUERY_OBJECT_TO_RESULTS:
      return {
        query: copyQueryObjectToResults(state.query, action, state.search),
        search,
      };
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
