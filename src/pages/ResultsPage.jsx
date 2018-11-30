import React, { Fragment } from 'react';
import queryString from 'query-string';

const ResultsPage = ({ match, location }) => (
  <Fragment>
    <h1>Results</h1>
    <div>{match.params.query}</div>
  </Fragment>
);

export default ResultsPage;
