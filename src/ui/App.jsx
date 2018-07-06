import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UniProtHeader from './header/UniProtHeader';
import HomePage from './pages/HomePage';

const App = () => (
  <Router>
    <Fragment>
      <UniProtHeader />
      <Route path="/" exact component={HomePage} />
    </Fragment>
  </Router>
);

export default App;
