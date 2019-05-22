import React from 'react';
import SimpleView from './SimpleView';
import { OrganismData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

type OrganismDataProps = {
  data: OrganismData;
};

const OrganismView: React.FC<OrganismDataProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const termValue = `${data.scientificName}${
    data.commonName ? ` (${data.commonName})` : ''
  } ${data.synonyms && data.synonyms.length > 0 ? ` (${data.synonyms})` : ''}`;

  return <SimpleView termValue={termValue} />;
};

export default OrganismView;
