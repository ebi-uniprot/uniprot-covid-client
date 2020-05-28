import React from 'react';

import './styles/error-component.scss';

const ErrorComponent = () => (
  <div className="error-component">
    <h5>An unexpected issue occured</h5>
    <p>
      You can try to reload the page, use the rest of this page, or go back to
      the previous page.
    </p>
    <p>
      If the error persists, please{' '}
      <a
        target="_blank"
        href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
        rel="noopener noreferrer"
      >
        report this bug here
      </a>
      .
    </p>
  </div>
);

export default ErrorComponent;
