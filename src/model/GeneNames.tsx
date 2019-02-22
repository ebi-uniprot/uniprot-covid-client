import React from 'react';
import idx from 'idx';
import NameView from './NameView';

export type GeneNamesData = {
  genes?: [
    {
      geneName: {
        value: string;
      };
      synonyms?: [{ value: string }];
      orfNames?: [{ value: string }];
    }
  ];
};

type GeneNamesDataProps = {
  data: GeneNamesData;
};

export const GeneNames: React.FC<GeneNamesDataProps> = ({ data }) => {
  const genes = idx(data, _ => _.genes);
  if (!genes || genes.length <= 0) {
    return null;
  }
  const names: string[] = [];
  const alternativeNames: string[] = [];
  genes.forEach(gene => {
    if (gene.geneName) {
      names.push(gene.geneName.value);
    }
    if (gene.synonyms) {
      alternativeNames.push(...gene.synonyms.map(syn => syn.value));
    }
    if (gene.orfNames) {
      alternativeNames.push(...gene.orfNames.map(orf => orf.value));
    }
  });
  const nameString = names.join(', ');
  const props = { name: nameString, alternativeNames };
  return <NameView {...props} />;
};
