import results from '../reducers';
import { toggleFacet, fetchResultsStarted } from '../actions';

describe('Results reducer', () => {
  test('should add new facet', () => {
    const state = {
      selectedFacets: {},
    };
    const action = toggleFacet('facet1', 'value1');
    expect(results(state, action)).toEqual({
      selectedFacets: {
        facet1: ['value1'],
      },
    });
  });

  test('should add new facet value', () => {
    const state = {
      selectedFacets: { facet1: ['value1'] },
    };
    const action = toggleFacet('facet1', 'value2');
    expect(results(state, action)).toEqual({
      selectedFacets: {
        facet1: ['value1', 'value2'],
      },
    });
  });

  test('should toggle facet', () => {
    const state = {
      selectedFacets: { facet1: ['value1', 'value2'] },
    };
    const action = toggleFacet('facet1', 'value1');
    expect(results(state, action)).toEqual({
      selectedFacets: {
        facet1: ['value2'],
      },
    });
  });

  test('should set flag for getting results', () => {
    const state = {
      isFetching: false,
    };
    const action = fetchResultsStarted();
    expect(results(state, action)).toEqual({
      isFetching: true,
    });
  });
});
