import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';
import * as Sentry from '@sentry/browser';

import BaseLayout from '../../shared/components/layouts/BaseLayout';

import history from '../../shared/utils/browserHistory';

import { Location, LocationToPath } from '../config/urls';

import './styles/app.scss';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://be99e24b352b42019d5b9f53dd7b68c3@sentry.io/1770286',
  });
}

// Async loading of page components
const HomePage = lazy(() =>
  import(/* webpackChunkName: "home-page" */ './HomePage')
);
const ResultsPage = lazy(() =>
  import(
    /* webpackChunkName: "results" */ '../../uniprotkb/components/results/ResultsContainer'
  )
);
const EntryPage = lazy(() =>
  import(
    /* webpackChunkName: "entry" */ '../../uniprotkb/components/entry/Entry'
  )
);
const AdvancedSearchPage = lazy(() =>
  import(
    /* webpackChunkName: "advanced-search" */ '../../uniprotkb/components/query-builder/AdvancedSearchContainer'
  )
);
const CustomiseTablePage = lazy(() =>
  import(
    /* webpackChunkName: "customise-table" */ '../../uniprotkb/components/customise-table/CustomiseTableContainer'
  )
);
const DownloadPage = lazy(() =>
  import(
    /* webpackChunkName: "download" */ '../../uniprotkb/components/download/DownloadContainer'
  )
);
const BlastResult = lazy(() =>
  import(
    /* webpackChunkName: "blast-result" */ '../../tools/blast/components/BlastResult'
  )
);
const BlastForm = lazy(() =>
  import(
    /* webpackChunkName: "blast-form" */ '../../tools/blast/components/BlastForm'
  )
);
const Dashboard = lazy(() =>
  import(
    /* webpackChunkName: "dashboard" */ '../../tools/dashboard/components/Dashboard'
  )
);
const ResourceNotFoundPage = lazy(() =>
  import(
    /* webpackChunkName: "resource-not-found" */ '../../shared/components/error-pages/ResourceNotFoundPage'
  )
);

const App = () => (
  <FranklinSite>
    <Router history={history}>
      <BaseLayout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              path={LocationToPath[Location.Home]}
              exact
              component={HomePage}
            />
            <Route
              path={LocationToPath[Location.UniProtKBEntry]}
              component={EntryPage}
            />
            <Route
              path={LocationToPath[Location.UniProtKBResults]}
              component={ResultsPage}
            />
            <Route
              path={LocationToPath[Location.UniProtKBCustomiseTable]}
              component={CustomiseTablePage}
            />
            <Route
              path={LocationToPath[Location.UniProtKBDownload]}
              component={DownloadPage}
            />
            <Route
              path={LocationToPath[Location.BlastResult]}
              component={BlastResult}
            />
            <Route
              path={LocationToPath[Location.Blast]}
              component={BlastForm}
            />
            <Route
              path={LocationToPath[Location.Dashboard]}
              component={Dashboard}
            />
            <Route
              path={LocationToPath[Location.UniProtKBQueryBuilder]}
              component={AdvancedSearchPage}
            />
            <Route component={ResourceNotFoundPage} />
          </Switch>
        </Suspense>
      </BaseLayout>
    </Router>
  </FranklinSite>
);

export default App;
