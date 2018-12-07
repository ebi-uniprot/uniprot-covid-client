import React from 'react';
import get from 'lodash/get';
import SimpleView from './SimpleView';
import NameView from './NameView';

const FieldToViewMappings = {
  accession: row => <SimpleView termValue={row.accession} />,
  id: row => <SimpleView termValue={row.id} />,
  protein_name: (row) => {
    const alternativeNames = [];
    const ecNumber = get(row, 'protein.recommendedName.ecNumber.value');
    if (ecNumber) {
      alternativeNames.push(ecNumber);
    }
    const alternativeName = get(row, 'protein.recommendedName.alternativeName.value');
    if (alternativeName) {
      alternativeNames.push(alternativeName);
    }
    const props = {
      name: get(row, 'protein.recommendedName.fullName.value'),
      shortName: get(row, 'protein.recommendedName.shortName.value'),
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
