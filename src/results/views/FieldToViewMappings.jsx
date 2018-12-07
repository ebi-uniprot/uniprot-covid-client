import React from 'react';
import get from 'lodash.get';
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
    const alternativeName = get(row, 'protein.alternativeName[0].fullName.value');
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
    const genes = get(row, 'gene', []);
    const name = genes.map(gene => gene.name.value).join(', ');
    const alternativeNames = genes
      .map(gene => [
        ...get(gene, 'synonyms', []).map(syn => syn.value),
        ...get(gene, 'orfNames', []).map(orf => orf.value),
      ])
      .filter(x => x.length);
    const props = { name, alternativeNames };
    return <NameView {...props} />;
  },
};

export default FieldToViewMappings;
