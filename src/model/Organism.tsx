import React from 'react';
import SimpleView from './SimpleView';
import { OrganismData } from './uniprotkb/sections/NamesAndTaxonomyConverter';

type OrganismDataProps = {
  data: OrganismData;
};

export const Organism: React.FC<OrganismDataProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const termValue = `${data.scientificName}${
    data.commonName ? ` (${data.commonName})` : ''
  } ${data.synonyms && data.synonyms.length > 0 ? ` (${data.synonyms})` : ''}`;

  return <SimpleView termValue={termValue} />;
};
