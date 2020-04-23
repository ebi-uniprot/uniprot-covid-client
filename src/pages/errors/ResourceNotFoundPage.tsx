import React from 'react';
import { Message } from 'franklin-sites';
import ArtWork from '../../svg/404.svg';

import '../../styles/ErrorPages.scss';

const ResourceNotFoundPage = () => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />

    <Message level="failure">
      <h4>Sorry, this page can&apos;t be found!</h4>
      <span>Please check the address bar for any mistakes</span>
    </Message>
  </div>
);

export default ResourceNotFoundPage;
