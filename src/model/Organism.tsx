import React from 'react';
import idx from 'idx';
import SimpleView from './SimpleView';

export type OrganismData = {
  organism?: {
    scientificName?: string;
    commonName?: string;
    synonyms?: string[];
    taxonId: number;
  };
};

type OrganismDataProps = {
  data: OrganismData;
};

export const Organism: React.FC<OrganismDataProps> = ({ data }) => {
  if (!data.organism) {
    return null;
  }
  const scientificName = idx(data, _ => _.organism.scientificName);
  const commonName = idx(data, _ => _.organism.commonName);
  const synonyms = idx(data, _ => _.organism.synonyms);

  const termValue = `${scientificName}${commonName ? ` (${commonName})` : ''} ${
    synonyms && synonyms.length > 0 ? ` (${synonyms})` : ''
  }`;

  return <SimpleView termValue={termValue} />;
};
