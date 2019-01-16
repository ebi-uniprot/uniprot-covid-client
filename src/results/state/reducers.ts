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
    case resultsActions.TOGGLE_FACET: {
      const { selectedFacets } = state;
      if (!(action.facetName in selectedFacets)) {
        selectedFacets[action.facetName] = [action.facetValue];
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
    case resultsActions.UPDATE_QUERY_STRING: {
      return {
        ...state,
        queryString: action.queryString,
      };
    }
    default:
      return state;
  }
};

export default results;
