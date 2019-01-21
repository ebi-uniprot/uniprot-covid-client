import results from '../reducers';
import { addFacet, removeFacet, fetchResultsRequest } from '../actions';

describe('Results reducer', () => {
  test('should add new facet', () => {
    const state = {
      selectedFacets: [],
    };
    const action = addFacet('facet1', 'value1');
    expect(results(state, action)).toEqual({
      selectedFacets: [{ name: 'facet1', value: 'value1' }],
    });
  });

  test('should remove facet', () => {
    const state = {
      selectedFacets: [{ name: 'facet1', value: 'value1' }],
    };
    const action = removeFacet('facet1', 'value1');
    expect(results(state, action)).toEqual({
      selectedFacets: [],
    });
  });

  test('should set flag for getting results', () => {
    const state = {
      isFetching: false,
    };
    const action = fetchResultsRequest();
    expect(results(state, action)).toEqual({
      isFetching: true,
    });
  });
});
