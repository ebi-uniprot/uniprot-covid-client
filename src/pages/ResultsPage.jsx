import React, { Fragment } from 'react';
import ResultsContainer from '../results/ResultsContainer';
import AdvancedSearchContainer from '../advanced-search/AdvancedSearchContainer';

const ResultsPage = () => (
  <Fragment>
    <AdvancedSearchContainer />
    <ResultsContainer />
  </Fragment>
);

export default ResultsPage;
