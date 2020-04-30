import React, { FC } from 'react';
import { LocationToPath, Location } from '../../urls';
import browserHistory from '../../utils/browserHistory';

const ErrorHandler: FC<{ status?: Number }> = ({ status }) => {
  //TODO instead of doing redirects, this should return the components
  // so that the url is unchanged
  switch (status) {
    case 400:
    case 404:
      browserHistory.push(LocationToPath[Location.PageNotFound]);
      break;
    case 500:
    case 503:
      browserHistory.push(LocationToPath[Location.ServiceUnavailable]);
      break;

    default:
      //TODO this could be improved, maybe automatic retries or
      //showing a popup message with a timer saying retrying in n seconds
      browserHistory.push(LocationToPath[Location.ServiceUnavailable]);
      break;
  }
  return null;
};

export default ErrorHandler;
