import React from 'react';

import '../../styles/ErrorPages.scss';

const ErrorPage: React.FC<{
  artwork: JSX.Element;
  message: JSX.Element;
  testid?: string;
}> = ({ artwork, message, testid }) => (
  <div className="error-page-container" data-testid={testid || ''}>
    <artwork.type
      {...artwork.props}
      className="error-page-container__art-work"
    />
    {message}
  </div>
);

export default ErrorPage;
