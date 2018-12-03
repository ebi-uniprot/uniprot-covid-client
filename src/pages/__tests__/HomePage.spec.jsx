import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { createEmptyClause } from '../../advanced-search/utils/clause';

import HomePage from '../HomePage';

const mockStore = configureStore([thunkMiddleware]);
const initialState = {
  query: {
    clauses: [...Array(4)].map(() => createEmptyClause()),
    namespace: 'UniProtKB',
    searchTerms: {
      data: [],
    },
    evidences: {
      go: {
        data: [],
        isFetching: false,
      },
      annotation: {
        data: [],
        isFetching: false,
      },
    },
  },
};

describe('HomePage component', () => {
  test('should render', () => {
    const store = mockStore(initialState);
    const component = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
