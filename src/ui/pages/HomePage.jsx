import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import HomePageLayout from '../layout/HomePageLayout';
import AdvancedSearch from '../search/AdvancedSearch';

const HomePage = () => (
  <HomePageLayout>
    <h3>Welcome!</h3>
    <AdvancedSearch />
    <Link to="/sample-page">Go to Sample Page</Link>
  </HomePageLayout>
);

export default HomePage;
