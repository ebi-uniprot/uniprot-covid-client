import { FETCH_RESULTS_STARTED, FETCH_RESULTS_SUCCESS, TOGGLE_FACET } from './actions';

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
        facets: action.data.facets,
        lastUpdated: action.receivedAt,
        isFetching: false,
      };
    case TOGGLE_FACET: {
      const { selectedFacets } = state;
      if (!(action.facetName in selectedFacets)) {
        selectedFacets[action.facetName] = [...Array(1)].map(() => action.facetValue);
      } else if (selectedFacets[action.facetName].includes(action.facetValue)) {
        selectedFacets[action.facetName] = selectedFacets[action.facetName].filter(
          f => f !== action.facetValue,
        );
      } else {
        selectedFacets[action.facetName].push(action.facetValue);
      }
      return {
        ...state,
        selectedFacets,
      };
    }
    default:
      return state;
  }
};

export default results;
