import React from 'react';
import { Message } from 'franklin-sites';
import ArtWork from '../../svg/undraw_page_not_found.svg';

import '../../styles/ErrorPages.scss';

const NotFoundPage = () => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />

    <Message level="failure">
      <h4>Sorry, this page can&apos;t be found!</h4>
      <span>Please check the address</span>
    </Message>
  </div>
);

export default NotFoundPage;
