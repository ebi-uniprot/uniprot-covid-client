import React from 'react';
import { Header } from 'franklin-sites';
import SearchContainer from '../../../uniprotkb/components/search/SearchContainer';
import Logo from './svgs/uniprot-logo.svg';

const UniProtHeader = ({ isHomePage = false, isSearchPage = false }) => {
  const shouldShowSearch = !isSearchPage && !isHomePage;
  return (
    <Header
      search={shouldShowSearch && <SearchContainer />}
      logo={<Logo style={{ marginRight: '5rem' }} width={120} height={50} />}
    />
  );
};
export default UniProtHeader;
