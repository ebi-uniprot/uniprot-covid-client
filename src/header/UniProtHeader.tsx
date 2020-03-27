import React from 'react';
import { Header } from 'franklin-sites';

import SearchContainer from '../search/SearchContainer';

import Logo from '../svg/uniprot-logo.svg';

const UniProtHeader = ({ isHomePage = false, isSearchPage = false }) => {
  const shouldShowSearch = !isSearchPage && !isHomePage;
  return (
    <Header
      isNegative={isHomePage}
      search={shouldShowSearch && <SearchContainer />}
      logo={<Logo style={{ marginRight: '5rem' }} width={120} height={50} />}
    />
  );
};
export default UniProtHeader;
