import React from 'react';
import { Message } from 'franklin-sites';
import ArtWork from '../../svg/undraw_obsolete.svg';

import '../../styles/ErrorPages.scss';

const ObsoleteEntryPage = () => (
  <div className="error-page-container">
    <ArtWork className="error-page-container__art-work" />

    <Message level="info">
      <h4>This entry is now obsolete!</h4>
      <span>Please try a different entry</span>
    </Message>
  </div>
);

export default ObsoleteEntryPage;
