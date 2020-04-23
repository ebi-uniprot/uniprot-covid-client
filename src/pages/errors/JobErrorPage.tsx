import React from 'react';
import { Message } from 'franklin-sites';
import ArtWork from '../../svg/job-failed.svg';

import '../../styles/ErrorPages.scss';

const JobErrorPage = () => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />

    <Message level="failure">
      <h4>Job Failed</h4>
      <span>Custom message here</span>
    </Message>
  </div>
);

export default JobErrorPage;
