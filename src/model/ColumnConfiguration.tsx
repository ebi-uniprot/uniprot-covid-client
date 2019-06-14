import React from 'react';
import SimpleView from '../view/uniprotkb/components/SimpleView';
import {
  ProteinNamesData,
  GeneNamesData,
  OrganismData,
} from './uniprotkb/sections/NamesAndTaxonomyConverter';
import { ProteinNames } from '../view/uniprotkb/components/ProteinNamesView';
import { convertProteinNames } from './uniprotkb/ProteinNamesConverter';
import OrganismView from '../view/uniprotkb/components/OrganismView';
import GeneNamesView from '../view/uniprotkb/components/GeneNamesView';
import { convertGeneNames } from './uniprotkb/GeneNamesConverter';

const WIDTH = {
  small: 200,
  medium: 400,
  large: 600,
};

const ColumnConfiguration: {
  [index: string]: {
    width: number;
    label: string;
    render: (data: any) => JSX.Element | undefined;
  };
} = {
  accession: {
    width: WIDTH.small,
    label: 'Entry',
    render: (data: { primaryAccession: string; entryType: string }) => (
      <SimpleView
        termValue={`${data.primaryAccession} (${data.entryType})`}
        linkTo={`/uniprotkb/${data.primaryAccession}`}
      />
    ),
  },
  id: {
    width: WIDTH.small,
    label: 'Entry Name',
    render: (data: { uniProtId: string }) => (
      <SimpleView termValue={data.uniProtId} />
    ),
  },
  protein_name: {
    width: WIDTH.large,
    label: 'Protein names',
    render: data => (
      <ProteinNames {...convertProteinNames(data.proteinDescription)} />
    ),
  },
  gene_names: {
    width: WIDTH.medium,
    label: 'Gene Names',
    render: data => <GeneNamesView {...convertGeneNames(data.genes)} />,
  },
  organism: {
    width: WIDTH.large,
    label: 'Organism',
    render: data => <OrganismView data={data.organism} />,
  },
};

export default ColumnConfiguration;
