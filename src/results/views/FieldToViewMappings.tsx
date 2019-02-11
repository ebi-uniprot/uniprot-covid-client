import React from 'react';
import idx from 'idx';
import SimpleView from './SimpleView';
import NameView from './NameView';

type ProteinNameRow = {
  proteinDescription: {
    recommendedName: {
      fullName: {
        value: string;
      };
    };
    shortNames: [
      {
        value: string;
      }
    ];
    alternativeNames: [
      {
        fullName: { value: string };
      }
    ];
    ecNumbers: [
      {
        value: string;
      }
    ];
  };
};

type GeneNameRow = {
  genes: [
    {
      geneName: {
        value: string;
      };
      synonyms: [{ value: string }];
      orfNames: [{ value: string }];
    }
  ];
};

type OrganismRow = {
  organism: {
    scientificName: string;
    commonName: string;
    synonyms: string[];
    taxonId: number;
  };
};

const FieldToViewMappings: {
  [index: string]: (row: any) => JSX.Element | undefined;
} = {
  accession: (row: { primaryAccession: string }) => (
    <SimpleView termValue={row.primaryAccession} />
  ),
  id: (row: { uniProtId: string }) => <SimpleView termValue={row.uniProtId} />,
  protein_name: (row: ProteinNameRow) => {
    const alternativeNames: string[] = [];
    const ecNumbers = idx(row, _ => _.proteinDescription.ecNumbers);
    if (ecNumbers && ecNumbers.length > 0) {
      alternativeNames.push(...ecNumbers.map(ec => ec.value));
    }
    const alternativeNameArray = idx(
      row,
      _ => _.proteinDescription.alternativeNames
    );
    if (alternativeNameArray) {
      const alternativeName = alternativeNameArray.map(
        name => name.fullName.value
      );
      if (alternativeName.length) {
        alternativeNames.push(...alternativeName);
      }
    }
    const props = {
      name: idx(row, _ => _.proteinDescription.recommendedName.fullName.value),
      shortName: idx(
        row,
        _ => _.proteinDescription.recommendedName.shortName.value
      ),
      alternativeNames,
    };
    return <NameView {...props} />;
  },
  gene_names: (row: GeneNameRow) => {
    const genes = idx(row, _ => _.genes);
    if (!genes || genes.length <= 0) {
      return;
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
  },
  organism: (row: OrganismRow) => {
    const scientificName = idx(row, _ => _.organism.scientificName);
    const commonName = idx(row, _ => row.organism.commonName);
    const synonyms = idx(row, _ => row.organism.synonyms);

    const termValue = `${scientificName}${
      commonName ? ` (${commonName})` : ''
    } ${synonyms && synonyms.length > 0 ? ` (${synonyms})` : ''}`;

    return <SimpleView termValue={termValue} />;
  },
};

export default FieldToViewMappings;
