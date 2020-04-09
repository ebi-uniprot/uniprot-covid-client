import React from 'react';
import { Message } from 'franklin-sites';
import ArtWork from '../../svg/undraw_no_results.svg';

import '../../styles/ErrorPages.scss';

const NoResultsPage = () => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />

    <Message level="info">
      <h4>Sorry, no results were found!</h4>
      <span>Please try a different criteria</span>
    </Message>
  </div>
);

export default NoResultsPage;
