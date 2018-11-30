import { combineReducers } from 'redux';
import query from '../advanced-search/state/reducers';
import search from '../results/state/reducers';
import { COPY_QUERY_OBJECT_GO_TO_RESULTS } from './actions';

const handleCopyQueryObjectGoToResults = (searchState, action, queryState) => {
  const queryClauses = JSON.parse(JSON.stringify(queryState.clauses));
  return {
    ...searchState,
    queryClauses,
  };
};

const combinedReducer = combineReducers({
  query,
  search,
});

const crossSliceReducer = (state, action) => {
  switch (action.type) {
    case COPY_QUERY_OBJECT_GO_TO_RESULTS:
      return {
        query: state.query,
        search: handleCopyQueryObjectGoToResults(state.search, action, state.query),
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
