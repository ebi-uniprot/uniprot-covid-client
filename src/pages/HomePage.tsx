import React from 'react';
import { Tile, HeroHeader, HeroContainer } from 'franklin-sites';
import Block from '../layout/Block';
import HomePageLayout from '../layout/HomePageLayout';
import SearchContainer from '../search/SearchContainer';

const mission =
  'The mission of UniProt is to provide the scientific community with a comprehensive, high-quality and freely accessible resource of protein sequence and functional information.';

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
    <Block columns="4">
      <Tile title="Literature Citations" small={true} />
      <Tile title="Taxonomy" small={true} />
      <Tile title="Subcellular locations" small={true} />
      <Tile title="Cross-ref databases" small={true} />
    </Block>
    <Block columns="4">
      <Tile title="Diseases" small={true} />
      <Tile title="Keywords" small={true} />
      <Tile title="UniRule" small={true} />
      <Tile title="SAAS" small={true} />
    </Block>
    <HeroContainer title="News">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
        leo velit, ut maximus ante pretium a. Nulla diam elit, consectetur
        pulvinar dolor sit amet, dictum mattis lectus. Phasellus libero dui,
        aliquam non molestie nec, scelerisque id neque. Morbi sit amet varius
        ipsum. Pellentesque faucibus auctor ornare. Etiam enim ante, iaculis sit
        amet sagittis quis, cursus vitae massa. Etiam sit amet molestie tellus.
        Aliquam rutrum cursus eros non finibus. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Morbi faucibus
        libero felis, eget fermentum urna sagittis ut. Integer enim nisi,
        euismod quis ex quis, elementum tincidunt justo. Curabitur nec urna quis
        leo rutrum cursus. Phasellus mi risus, faucibus a faucibus sit amet,
        porttitor vel ex. Mauris suscipit metus in convallis venenatis.
      </p>
      <p>
        Praesent lacinia malesuada lacus, venenatis ultricies leo viverra eu.
        Nulla vitae euismod ex. Praesent a sem nec ipsum fringilla ornare id
        eget sem. Sed euismod nibh quis lacus suscipit vulputate. In vel
        condimentum tortor, at mattis nibh. Donec vel ipsum rhoncus, laoreet
        quam vitae, commodo enim. Aliquam a tortor et nisl iaculis vehicula sed
        quis justo. Phasellus tempus lectus et posuere tempus.
      </p>
    </HeroContainer>
    <Block columns="4">
      <Tile
        title="BLAST"
        description="The Basic Local Alignment Search Tool finds regions of local similarity between sequences."
      />
      <Tile
        title="ALIGN"
        description="Align two or more protein sequences with the Clust Omega program."
      />
      <Tile
        title="Retrieve/ID Mapping"
        description="Retrieve and/or convert non UniProt identifiers to download lists for use on this website."
      />
      <Tile
        title="Peptide Search"
        description="Find all UniProtKB sequences that exactly match a query peptide sequence."
      />
    </Block>
    <HeroContainer title="Need Help?">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
        leo velit, ut maximus ante pretium a. Nulla diam elit, consectetur
        pulvinar dolor sit amet, dictum mattis lectus. Phasellus libero dui,
        aliquam non molestie nec, scelerisque id neque. Morbi sit amet varius
        ipsum. Pellentesque faucibus auctor ornare. Etiam enim ante, iaculis sit
        amet sagittis quis, cursus vitae massa. Etiam sit amet molestie tellus.
        Aliquam rutrum cursus eros non finibus. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Morbi faucibus
        libero felis, eget fermentum urna sagittis ut. Integer enim nisi,
        euismod quis ex quis, elementum tincidunt justo. Curabitur nec urna quis
        leo rutrum cursus. Phasellus mi risus, faucibus a faucibus sit amet,
        porttitor vel ex. Mauris suscipit metus in convallis venenatis.
      </p>
      <p>
        Praesent lacinia malesuada lacus, venenatis ultricies leo viverra eu.
        Nulla vitae euismod ex. Praesent a sem nec ipsum fringilla ornare id
        eget sem. Sed euismod nibh quis lacus suscipit vulputate. In vel
        condimentum tortor, at mattis nibh. Donec vel ipsum rhoncus, laoreet
        quam vitae, commodo enim. Aliquam a tortor et nisl iaculis vehicula sed
        quis justo. Phasellus tempus lectus et posuere tempus.
      </p>
    </HeroContainer>
    <Block columns="3">
      <Tile
        title="Programmatic access"
        description="Query UniProt data using APIs providing REST, SPARQL and Java services."
      />
      <Tile title="FTP Download" description="Get the UniProt data directly." />
      <Tile
        title="Technical Documentation"
        description="Access extensive technical documents to help you use UniProt to its full potential."
      />
    </Block>
  </HomePageLayout>
);

export default HomePage;
