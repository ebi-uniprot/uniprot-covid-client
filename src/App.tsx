import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';
import * as Sentry from '@sentry/browser';
import BaseLayout from './layout/BaseLayout';
import { Location, LocationToPath } from './urls';
import './styles/App.scss';

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
const DownloadPage = lazy(() => import('./pages/DownloadPage'));

const App = () => (
  <FranklinSite>
    <Router basename={BASE_URL}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path={LocationToPath.get(Location.Home)}
            exact
            render={() => <HomePage />}
          />
          <Route
            path={LocationToPath.get(Location.UniProtKBEntry)}
            render={() => <EntryPage />}
          />
          <Route
            path={LocationToPath.get(Location.UniProtKBResults)}
            render={() => <ResultsPage />}
          />
          <Route
            path={LocationToPath.get(Location.UniProtKBCustomiseTable)}
            render={() => (
              <BaseLayout>
                <CustomiseTablePage />
              </BaseLayout>
            )}
          />
          <Route
            path={LocationToPath.get(Location.UniProtKBDownload)}
            render={() => (
              <BaseLayout>
                <DownloadPage />
              </BaseLayout>
            )}
          />
          <Route
            path={`${LocationToPath.get(
              Location.UniProtKBQueryBuilder
            )}(/reset)?`}
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
