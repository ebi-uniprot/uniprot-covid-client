/* global BASE_URL */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BaseLayout from './layout/BaseLayout';
import HomePage from './pages/HomePage';

const App = () => (
  <Router>
    <BaseLayout>
      <Route path={BASE_URL} exact component={HomePage} />
    </BaseLayout>
  </Router>
);

export default App;
