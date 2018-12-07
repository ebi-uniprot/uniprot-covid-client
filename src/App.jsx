/* global BASE_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { joinUrl } from './utils/apiUrls';
import BaseLayout from './layout/BaseLayout';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

const App = ({ store }) => (
  <Provider store={store}>
    <Router basename={BASE_URL}>
      <BaseLayout>
        <Route path="/" exact component={HomePage} />
        <Route path="/uniprotkb" component={ResultsPage} />
      </BaseLayout>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape.isRequired,
};

export default App;
