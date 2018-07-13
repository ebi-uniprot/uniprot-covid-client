import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tile } from 'franklin-sites';

import Block from '../layout/Block';
import HomePageLayout from '../layout/HomePageLayout';

const HomePage = () => (
  <HomePageLayout>
    <Block columns="1">
      <div>1st col block</div>
    </Block>

    <Block columns="4">
      <Tile title="UniProtKB" />
      <Tile title="Proteomes" namespace="proteomes" description="Sets of proteins for reference and other species of interest."/>
      <Tile title="UniRef" namespace="uniref" description="Clusters of protein sequences at 100%, 90% &amp; 50% similarity" />
      <Tile title="UniParc" namespace="uniparc" description="Non-redundant archive of protein sequences publicly available (UniProt, RefSeq, Ensembl,...)"/>
    </Block>

    <Block columns="3">
      <div>1st col block</div>
      <div>2nd col block</div>
      <div>3rd col block</div>
    </Block>

    <Block columns="4">
      <div>1st col block</div>
      <div>2nd col block</div>
      <div>3rd col block</div>
      <div>4th col block</div>
      <div>5th col block</div>
      <div>6th col block</div>
    </Block>
  </HomePageLayout>
);

export default HomePage;
