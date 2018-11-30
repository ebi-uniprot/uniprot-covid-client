// @flow
import React from 'react';
import { Tile } from 'franklin-sites';

import Block from '../layout/Block';
import HomePageLayout from '../layout/HomePageLayout';
// import AdvancedSearchContainer from '../advanced-search/AdvancedSearchContainer';

const ResultsPage = () => (
  <HomePageLayout>
    <Block columns="1">
      <AdvancedSearchContainer />
    </Block>
    Hi there
  </HomePageLayout>
);

export default ResultsPage;
