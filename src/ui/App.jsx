
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import BaseLayout from './layout/BaseLayout';
import HomePage from './pages/HomePage';
import SamplePage from './pages/SamplePage';

const App = () => (
  <Router>
    <BaseLayout>
      <Route path="/" exact component={HomePage} />
      <Route path="/sample-page" component={SamplePage} />
    </BaseLayout>
  </Router>
);

export default App;
