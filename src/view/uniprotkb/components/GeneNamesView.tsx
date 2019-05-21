import React from 'react';
import NameView from './NameView';

type GeneNamesDataProps = {
  name: string;
  alternativeNames: string[];
};

export const GeneNames: React.FC<GeneNamesDataProps> = ({
  name,
  alternativeNames,
}) => {
  if (!name) {
    return null;
  }
  const props = { name, alternativeNames };
  return <NameView {...props} />;
};
