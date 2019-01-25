import React from 'react';
import idx from 'idx';
import SimpleView from './SimpleView';
import NameView from './NameView';

type ProteinNameRow = {
  protein: {
    recommendedName: {
      ecNumber: {
        value: string;
      };
      fullName: {
        value: string;
      };
      shortName: {
        value: string;
      };
    };
    alternativeName: [{ fullName: { value: string } }];
  };
};

type GeneNameRow = {
  gene: [
    {
      name: {
        value: string;
      };
      synonyms: [{ value: string }];
      orfNames: [{ value: string }];
    }
  ];
};

type OrganismRow = {
  organism: {
    names: [
      {
        type: string;
        value: string;
      }
    ];
  };
};

const organismNameReducer = (type: string) => (
  acc: string,
  organismName: { type: string; value: string },
) => {
  if (organismName.type === type) {
    if (type === 'scientific') {
      return `${acc} ${organismName.value}`;
    }
    return `${acc} (${organismName.value})`;
  }
  return acc;
};

const FieldToViewMappings = {
  accession: (row: { accession: string }) => <SimpleView termValue={row.accession} />,
  id: (row: { id: string }) => <SimpleView termValue={row.id} />,
  protein_name: (row: ProteinNameRow) => {
    const alternativeNames: string[] = [];
    const ecNumber = idx(row, _ => _.protein.recommendedName.ecNumber.value);
    if (ecNumber) {
      alternativeNames.push(ecNumber);
    }
    const alternativeNameArray = idx(row, _ => _.protein.alternativeName);
    if (alternativeNameArray) {
      const alternativeName = alternativeNameArray.map(name => name.fullName.value);
      if (alternativeName.length) {
        alternativeNames.push(...alternativeName);
      }
    }
    const props = {
      name: idx(row, _ => _.protein.recommendedName.fullName.value),
      shortName: idx(row, _ => _.protein.recommendedName.shortName.value),
      alternativeNames,
    };
    return <NameView {...props} />;
  },
  gene_names: (row: GeneNameRow) => {
    const genes = idx(row, _ => _.gene);
    if (!genes || genes.length <= 0) {
      return;
    }
    // const name = genes.map(gene => idx(gene, _ => _.name.value)).join(', ');
    const names: string[] = [];
    const alternativeNames: string[] = [];
    genes.forEach((gene) => {
      if (gene.name) {
        names.push(gene.name.value);
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
  },
  organism: (row: OrganismRow) => {
    const names = idx(row, _ => _.organism.names);
    if (!names) {
      return;
    }
    const termValue = ['scientific', 'common', 'synonym'].reduce(
      (acc, organismName) => `${acc} ${names.reduce(organismNameReducer(organismName), '')}`,
      '',
    );
    return <SimpleView termValue={termValue} />;
  },
};

export default FieldToViewMappings;
