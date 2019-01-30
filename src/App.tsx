import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite } from 'franklin-sites';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

declare const BASE_URL: string;

const App = () => (
  <FranklinSite>
    <Router basename={BASE_URL}>
      <Switch>
        <Route path="/" exact render={HomePage} />
        <Route path="/uniprotkb" component={ResultsPage} />
      </Switch>
    </Router>
  </FranklinSite>
);

export default App;
