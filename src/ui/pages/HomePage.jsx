import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AdvancedSearch from '../search/AdvancedSearch';

const HomePage = () => (
  <Fragment>
    <h3>Welcome!</h3>
    <AdvancedSearch />
    <Link to="/sample-page">Go to Sample Page</Link>
  </Fragment>
);

export default HomePage;
