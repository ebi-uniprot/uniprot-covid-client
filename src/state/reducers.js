import { combineReducers } from 'redux';
import query from '../search/state/reducers';
import results from '../results/state/reducers';
import { ADD_FACETS_TO_QUERY_STRING } from '../results/state/actions';
import { createFacetsQueryString } from '../search/utils/QueryStringGenerator';

const combinedReducer = combineReducers({
  query,
  results,
});

const crossSliceReducer = (state, action) => {
  switch (action.type) {
    case ADD_FACETS_TO_QUERY_STRING: {
      const { queryString } = state.query;
      const { selectedFacets } = state.results;
      const facetsQueryString = createFacetsQueryString(selectedFacets);
      // TODO once we have the query -> object parser we need to mesh the
      // existing query and the facets one
      return {
        query: { ...state.query, queryString: `${queryString}${facetsQueryString}` },
        results: state.results,
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
