import React from 'react';
import SimpleView from './SimpleView';
import NameView from './NameView';

const FieldToViewMappings = {
  accession: row => <SimpleView termValue={row.accession} />,
  id: row => <SimpleView termValue={row.id} />,
  protein_name: (row) => {
    const alternativeNames = [];
    if (row.protein.recommendedName.ecNumber) {
      alternativeNames.push(row.protein.recommendedName.ecNumber.value);
    }
    if (row.protein.recommendedName.alternativeName) {
      alternativeNames.push(row.protein.recommendedName.alternativeName.value);
    }
    const props = {
      name: row.protein.recommendedName.fullName
        ? row.protein.recommendedName.fullName.value
        : undefined,
      shortName: row.protein.recommendedName.shortName
        ? row.protein.recommendedName.shortName.value
        : undefined,
      alternativeNames,
    };
    return <NameView {...props} />;
  },
  gene_name: (row) => {
    const props = {
      name: row.gene.name.value,
      alternativeNames: [
        ...row.gene.synonyms.map(syn => syn.value),
        ...row.gene.orfNames.map(orf => orf.value),
      ],
    };
    return <NameView {...props} />;
  },
};

export default FieldToViewMappings;
