import results from '../reducers';
import {
  addFacet,
  removeFacet,
  requestResults,
  updateColumnSort,
} from '../actions';

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
    const action = requestResults('http://some-url');
    expect(results(state, action)).toEqual({
      isFetching: {
        'http://some-url': true,
      },
    });
  });

  test('should sort on a column', () => {
    const state = {
      sort: { column: 'foo', direction: 'descend' },
    };
    const action = updateColumnSort('bar');
    expect(results(state, action)).toEqual({
      sort: { column: 'bar', direction: 'ascend' },
    });
  });
});
