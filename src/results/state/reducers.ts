import { array } from 'prop-types';
import * as resultsActions from './actions';

const results = (state = [], action) => {
  switch (action.type) {
    case resultsActions.FETCH_RESULTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case resultsActions.FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.data.results,
        facets: action.data.facets,
        lastUpdated: action.receivedAt,
        isFetching: false,
      };
    case resultsActions.ADD_FACET: {
      return {
        ...state,
        selectedFacets: [
          ...state.selectedFacets.slice(0, state.selectedFacets.length),
          action.facet,
        ],
      };
    }
    case resultsActions.REMOVE_FACET: {
      const index = state.selectedFacets.findIndex(
        selectedFacet => action.facet.name === selectedFacet.name && action.facet.value === selectedFacet.value,
      );
      return {
        ...state,
        selectedFacets: [
          ...state.selectedFacets.slice(0, index),
          ...state.selectedFacets.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};

export default results;
