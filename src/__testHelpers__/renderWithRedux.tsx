/* eslint-disable */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory, MemoryHistory } from 'history';
import rootReducer from '../state/rootReducer';
import { Router, Route } from 'react-router-dom';

type RenderOptions = {
  route?: string;
  history?: MemoryHistory<any>;
  path?: string;
  initialState?: any;
  store?: any;
};

const renderWithRedux = (
  ui: React.Component,
  {
    route = '',
    history = createMemoryHistory({ initialEntries: [route] }),
    path,
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  }: RenderOptions = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          {path ? <Route path={path} render={() => ui} /> : ui}
        </Router>
      </Provider>
    ),
    store,
    history,
  };
};

export default renderWithRedux;
