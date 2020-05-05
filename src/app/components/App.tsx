import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';
import * as Sentry from '@sentry/browser';
import BaseLayout from '../../shared/components/layouts/BaseLayout';
import { Location, LocationToPath } from '../config/urls';
import './styles/App.scss';
import history from '../../shared/utils/browserHistory';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://be99e24b352b42019d5b9f53dd7b68c3@sentry.io/1770286',
  });
}

// Async loading of page components
const HomePage = lazy(() => import('./HomePage'));
const ResultsPage = lazy(() =>
  import('../../uniprotkb/components/results/ResultsContainer')
);
const EntryPage = lazy(() => import('../../uniprotkb/components/entry/Entry'));
const AdvancedSearchPage = lazy(() =>
  import('../../uniprotkb/components/query-builder/AdvancedSearchContainer')
);
const CustomiseTablePage = lazy(() =>
  import('../../uniprotkb/components/customise-table/CustomiseTableContainer')
);
const DownloadPage = lazy(() =>
  import('../../uniprotkb/components/download/DownloadContainer')
);
const ResourceNotFoundPage = lazy(() =>
  import('../../shared/components/error-pages/ResourceNotFoundPage')
);
const ServiceUnavailablePage = lazy(() =>
  import('../../shared/components/error-pages/ServiceUnavailablePage')
);
const JobErrorPage = lazy(() =>
  import('../../shared/components/error-pages/JobErrorPage')
);

const App = () => (
  <FranklinSite>
    <Router history={history}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path={LocationToPath[Location.Home]}
            exact
            render={() => <HomePage />}
          />
          <Route
            path={LocationToPath[Location.UniProtKBEntry]}
            render={() => <EntryPage />}
          />
          <Route
            path={LocationToPath[Location.UniProtKBResults]}
            render={() => <ResultsPage />}
          />
          <Route
            path={LocationToPath[Location.UniProtKBCustomiseTable]}
            render={() => (
              <BaseLayout>
                <CustomiseTablePage />
              </BaseLayout>
            )}
          />
          <Route
            path={LocationToPath[Location.UniProtKBDownload]}
            render={() => (
              <BaseLayout>
                <DownloadPage />
              </BaseLayout>
            )}
          />
          <Route
            path={LocationToPath[Location.PageNotFound]}
            render={() => (
              <BaseLayout>
                <ResourceNotFoundPage />
              </BaseLayout>
            )}
          />
          <Route
            path={LocationToPath[Location.ServiceUnavailable]}
            render={() => (
              <BaseLayout>
                <ServiceUnavailablePage />
              </BaseLayout>
            )}
          />
          <Route
            path={LocationToPath[Location.JobError]}
            render={() => (
              <BaseLayout>
                <JobErrorPage />
              </BaseLayout>
            )}
          />
          <Route
            path={`${LocationToPath[Location.UniProtKBQueryBuilder]}(/reset)?`}
            render={() => (
              <BaseLayout isSearchPage>
                <AdvancedSearchPage />
              </BaseLayout>
            )}
          />
          <Route
            render={() => (
              <BaseLayout>
                <ResourceNotFoundPage />
              </BaseLayout>
            )}
          />
        </Switch>
      </Suspense>
    </Router>
  </FranklinSite>
);

export default App;
