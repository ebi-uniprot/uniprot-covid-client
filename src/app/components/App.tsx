import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';
import BaseLayout from '../../shared/components/layouts/BaseLayout';
import { Location, LocationToPath } from '../config/urls';
import './styles/app.scss';
import history from '../../shared/utils/browserHistory';

// Async loading of page components
// const HomePage = lazy(() =>
//   import(/* webpackChunkName: "home-page" */ './HomePage')
// );
const ResultsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "results" */ '../../uniprotkb/components/results/ResultsContainer'
    )
);
const EntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "entry" */ '../../uniprotkb/components/entry/Entry'
    )
);
// const AdvancedSearchPage = lazy(() =>
//   import(
//     /* webpackChunkName: "advanced-search" */ '../../uniprotkb/components/query-builder/AdvancedSearchContainer'
//   )
// );
const CustomiseTablePage = lazy(
  () =>
    import(
      /* webpackChunkName: "customise-table" */ '../../uniprotkb/components/customise-table/CustomiseTableContainer'
    )
);
const DownloadPage = lazy(
  () =>
    import(
      /* webpackChunkName: "download" */ '../../uniprotkb/components/download/DownloadContainer'
    )
);
const ResourceNotFoundPage = lazy(
  () =>
    import(
      /* webpackChunkName: "resource-not-found" */ '../../shared/components/error-pages/ResourceNotFoundPage'
    )
);
const ServiceUnavailablePage = lazy(
  () =>
    import(
      /* webpackChunkName: "service-unavailable" */ '../../shared/components/error-pages/ServiceUnavailablePage'
    )
);
const JobErrorPage = lazy(
  () =>
    import(
      /* webpackChunkName: "job-error" */ '../../shared/components/error-pages/JobErrorPage'
    )
);
const ContactPage = lazy(
  () =>
    import(
      /* webpackChunkName: "contact" */ '../../shared/components/contact/ContactPage'
    )
);

const App = () => (
  <FranklinSite>
    <Router history={history}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to={LocationToPath[Location.ShowAllResults]} />
          </Route>
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
            path={LocationToPath[Location.Contact]}
            render={() => <ContactPage />}
          />
          {/* <Route
            path={`${LocationToPath[Location.UniProtKBQueryBuilder]}(/reset)?`}
            render={() => (
              <BaseLayout isSearchPage>
                <AdvancedSearchPage queryString="" />
              </BaseLayout>
            )}
          /> */}
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
