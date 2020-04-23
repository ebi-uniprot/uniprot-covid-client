import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';
import * as Sentry from '@sentry/browser';
import BaseLayout from './layout/BaseLayout';
import './styles/App.scss';
import history from './utils/browserHistory';

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
const NoResultsPage = lazy(() => import('./pages/errors/NoResultsPage'));
const ResourceNotFoundPage = lazy(() => import('./pages/errors/ResourceNotFoundPage'));
const ServiceUnavailablePage = lazy(() => import('./pages/errors/ServiceUnavailablePage'));
const JobErrorPage = lazy(() => import('./pages/errors/JobErrorPage'));

export const queryBuilderPath = '/advancedSearch';

const App = () => (
  <FranklinSite>
    <Router history={history}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact render={() => <HomePage />} />
          <Route path="/uniprotkb/:accession" render={() => <EntryPage />} />
          <Route path="/uniprotkb" render={() => <ResultsPage />} />
          <Route
            path="/customise-table"
            render={() => (
              <BaseLayout>
                <CustomiseTablePage />
              </BaseLayout>
            )}
          />
          <Route
            path="/download"
            render={() => (
              <BaseLayout>
                <DownloadPage />
              </BaseLayout>
            )}
          />
          <Route
            path="/no-results"
            render={() => (
              <BaseLayout>
                <NoResultsPage />
              </BaseLayout>
            )}
          />
          <Route
            path="/page-not-found"
            render={() => (
              <BaseLayout>
                <ResourceNotFoundPage />
              </BaseLayout>
            )}
          />
          <Route
            path="/service-unavailable"
            render={() => (
              <BaseLayout>
                <ServiceUnavailablePage />
              </BaseLayout>
            )}
          />
          <Route
            path="/job-error"
            render={() => (
              <BaseLayout>
                <JobErrorPage />
              </BaseLayout>
            )}
          />
          <Route
            path={`${queryBuilderPath}(/reset)?`}
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
