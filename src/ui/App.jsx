/* global BASE_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BaseLayout from './layout/BaseLayout';
import HomePage from './pages/HomePage';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <BaseLayout>
        <Route path={BASE_URL} exact component={HomePage} />
      </BaseLayout>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape.isRequired,
};

export default App;
