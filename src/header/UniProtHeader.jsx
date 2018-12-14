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
    label: 'Aligh',
    path: '/',
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

const UniProtHeader = ({ isHomePage = false }) => (
  <Header
    links={links}
    isNegative={isHomePage}
    search={!isHomePage && <SearchContainer />}
    logo={<Logo width={120} height={50} />}
  />
);
export default UniProtHeader;
