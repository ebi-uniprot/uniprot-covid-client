import React from 'react';
import { Message } from 'franklin-sites';
import ArtWork from '../../svg/503.svg';

import '../../styles/ErrorPages.scss';

const ServiceUnavailablePage = () => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />

    <Message level="failure">
      <h4>This service is currently unavailable!</h4>
      <span>Please try again later</span>
    </Message>
  </div>
);

export default ServiceUnavailablePage;
