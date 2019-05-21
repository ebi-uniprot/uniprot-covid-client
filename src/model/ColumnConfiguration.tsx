import React from 'react';
import SimpleView from '../view/uniprotkb/components/SimpleView';
import { Organism } from '../view/uniprotkb/components/OrganismView';
import {
  ProteinNamesData,
  GeneNamesData,
  OrganismData,
} from './uniprotkb/sections/NamesAndTaxonomyConverter';

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
    render: (data: ProteinNamesData) => <span />,
    // TODO TEMPORARY!!!
    // <ProteinNames data={data} />,
  },
  gene_names: {
    width: WIDTH.medium,
    label: 'Gene Names',
    render: (data: GeneNamesData) => <span />,
    // TODO TEMPORARY!!!
    // <ProteinNames data={data} />,
  },
  organism: {
    width: WIDTH.large,
    label: 'Organism',
    render: (data: OrganismData) => <span />,
    // TODO TEMPORARY!!!
    // (data: OrganismData) => <Organism data={data} />,
  },
};

export default ColumnConfiguration;
