import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import rootReducer from '../state/rootReducer';
import { Router } from 'react-router-dom';

const renderWithRedux = (
  ui: React.Component,
  {
    route = '',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store,
    history,
  };
};

export default renderWithRedux;
