import { combineReducers, Action } from 'redux';
import query from '../search/state/reducers';
import results from '../results/state/reducers';
import { RootState } from './initialState';
import { ADD_FACETS_TO_QUERY_STRING } from '../results/state/actions';
import { createFacetsQueryString } from '../search/utils/QueryStringGenerator';

const combinedReducer = combineReducers({
  query,
  results,
});

const rootReducer = (state: RootState, action: Action) => {
  const intermediateState = combinedReducer(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};

const crossSliceReducer = (state: RootState, action: Action) => {
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

export default rootReducer;
