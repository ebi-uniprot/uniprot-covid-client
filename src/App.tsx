import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';
import * as Sentry from '@sentry/browser';
import BaseLayout from './layout/BaseLayout';
import './styles/App.scss';
import AdvancedSearchReset from './search/AdvancedSearchReset';

declare const BASE_URL: string;

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://be99e24b352b42019d5b9f53dd7b68c3@sentry.io/1770286',
  });
}

// Async loading of page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const EntryPage = lazy(() => import('./pages/EntryPage'));
const AdvancedSearchPage = lazy(() => import('./pages/AdvancedSearchPage'));
const CustomiseTablePage = lazy(() => import('./pages/CustomiseTablePage'));

export const queryBuilderPath = '/advancedSearch';

const App = () => (
  <FranklinSite>
    <Router basename={BASE_URL}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <BaseLayout isHomePage>
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
            path="/customise-table"
            render={() => (
              <BaseLayout>
                <CustomiseTablePage />
              </BaseLayout>
            )}
          />
          <Route
            path={`${queryBuilderPath}(\/reset)?`}
            render={() => (
              <BaseLayout isSearchPage>
                <AdvancedSearchPage />
              </BaseLayout>
            )}
          />
        </Switch>
      </Suspense>
    </Router>
  </FranklinSite>
);

export default App;
