/* global BASE_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite } from 'franklin-sites';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

const App = ({ store }) => (
  <FranklinSite>
    <Provider store={store}>
      <Router basename={BASE_URL}>
        <Switch>
          <Route path="/" exact render={HomePage} />
          <Route path="/uniprotkb" component={ResultsPage} />
        </Switch>
      </Router>
    </Provider>
  </FranklinSite>
);

App.propTypes = {
  store: PropTypes.shape.isRequired,
};

export default App;
