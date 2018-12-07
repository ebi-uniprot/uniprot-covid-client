import { combineReducers } from 'redux';
import query from '../advanced-search/state/reducers';
import results from '../results/state/reducers';
import { COPY_QUERY_CLAUSES_OBJECT_TO_SEARCH } from './actions';

const handleCopyQueryClausesToSearch = (resultsState, action, queryState) => {
  const queryClauses = JSON.parse(JSON.stringify(queryState.clauses));
  return {
    ...resultsState,
    queryClauses,
  };
};

const combinedReducer = combineReducers({
  query,
  results,
});

const crossSliceReducer = (state, action) => {
  switch (action.type) {
    case COPY_QUERY_CLAUSES_OBJECT_TO_SEARCH:
      return {
        query: state.query,
        results: handleCopyQueryClausesToSearch(state.results, action, state.query),
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
