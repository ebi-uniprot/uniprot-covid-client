/* eslint-disable */
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';

type RenderOptions = {
  route?: string;
  history?: MemoryHistory<any>;
  path?: string;
};
const renderWithRouter = (
  ui: React.Component,
  {
    route = '',
    path,
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderOptions = {}
) => {
  return {
    ...render(
      <Router history={history}>
        {path ? <Route path={path} render={() => ui} /> : ui}
      </Router>
    ),
    history,
  };
};

export default renderWithRouter;
