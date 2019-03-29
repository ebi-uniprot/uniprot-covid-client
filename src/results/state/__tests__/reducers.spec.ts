import results from '../reducers';
import { requestBatchOfResults } from '../actions';

describe('Results reducer', () => {
  test('should set flag for getting results', () => {
    const state = {
      isFetching: false,
    };
    const action = requestBatchOfResults('http://some-url');
    expect(results(state, action)).toEqual({
      isFetching: true,
    });
  });
});
