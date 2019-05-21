import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite } from 'franklin-sites';
import HomePage from './pages/HomePage';
import BaseLayout from './layout/BaseLayout';
import ResultsPage from './pages/ResultsPage';
import EntryPage from './pages/EntryPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage';

declare const BASE_URL: string;

const App = () => (
  <FranklinSite>
    <Router basename={BASE_URL}>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => (
            <BaseLayout isHomePage={true}>
              <HomePage />
            </BaseLayout>
          )}
        />
        <Route
          path="/uniprotkb/:accession"
          render={() => (
            <BaseLayout>
              <EntryPage />
            </BaseLayout>
          )}
        />
        <Route
          path="/uniprotkb"
          render={() => (
            <BaseLayout>
              <ResultsPage />
            </BaseLayout>
          )}
        />
        <Route
          path="/advancedSearch"
          render={() => (
            <BaseLayout isSearchPage={true}>
              <AdvancedSearchPage />
            </BaseLayout>
          )}
        />
      </Switch>
    </Router>
  </FranklinSite>
);

export default App;
