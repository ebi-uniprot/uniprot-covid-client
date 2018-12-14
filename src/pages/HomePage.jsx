// @flow
import React from 'react';
import { Tile, HeroHeader } from 'franklin-sites';
import Block from '../layout/Block';
import HomePageLayout from '../layout/HomePageLayout';
import SearchContainer from '../search/SearchContainer';

const mission = 'The mission of UniProt is to provide the scientific community with a comprehensive, high-quality and freely accessible resource of protein sequence and functional information.';

const HomePage = () => (
  <HomePageLayout>
    <HeroHeader title="Find your protein" footer={mission}>
      <SearchContainer />
    </HeroHeader>

    <Block columns="4">
      <Tile title="UniProtKB" />
      <Tile
        title="Proteomes"
        namespace="proteomes"
        description="Sets of proteins for reference and other species of interest."
      />
      <Tile
        title="UniRef"
        namespace="uniref"
        description="Clusters of protein sequences at 100%, 90% &amp; 50% similarity"
      />
      <Tile
        title="UniParc"
        namespace="uniparc"
        description="Non-redundant archive of protein sequences publicly available (UniProt, RefSeq, Ensembl,...)"
      />
    </Block>
  </HomePageLayout>
);

export default HomePage;
