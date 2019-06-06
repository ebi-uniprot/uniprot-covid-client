import React from 'react';
import { Header } from 'franklin-sites';

import SearchContainer from '../search/SearchContainer';

import Logo from '../svg/uniprot-rgb.svg';

const links = [
  {
    label: 'BLAST',
    path: '/',
  },
  {
    label: 'Align',
    path: '/',
  },
  {
    label: 'Advanced search',
    path: '/advancedSearch',
  },
  {
    label: 'Tools',
    path: '/',
  },
  {
    label: 'Help',
    path: '/',
  },
];

const UniProtHeader = ({ isHomePage = false, isSearchPage = false }) => {
  const shouldShowSearch = !isSearchPage && !isHomePage;
  return (
    <Header
      links={links}
      isNegative={isHomePage}
      search={shouldShowSearch && <SearchContainer />}
      logo={<Logo width={120} height={50} />}
    />
  );
};
export default UniProtHeader;
