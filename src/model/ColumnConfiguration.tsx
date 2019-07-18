/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import SimpleView from '../view/uniprotkb/components/SimpleView';
import { ProteinNamesView } from '../view/uniprotkb/components/ProteinNamesView';
import convertProteinNames from './uniprotkb/ProteinNamesConverter';
import OrganismView from '../view/uniprotkb/components/OrganismView';
import GeneNamesView from '../view/uniprotkb/components/GeneNamesView';
import convertGeneNames from './uniprotkb/GeneNamesConverter';
import { UniProtkbAPIModel } from './uniprotkb/UniProtkbConverter';

const ColumnConfiguration: {
  [index: string]: {
    label: string;
    render: (data: UniProtkbAPIModel) => JSX.Element | undefined;
  };
} = {
  accession: {
    label: 'Entry',
    render: (data: { primaryAccession: string; entryType: string }) => (
      <SimpleView
        termValue={`${data.primaryAccession} (${data.entryType})`}
        linkTo={`/uniprotkb/${data.primaryAccession}`}
      />
    ),
  },
  id: {
    label: 'Entry Name',
    render: (data: { uniProtId: string }) => (
      <SimpleView termValue={data.uniProtId} />
    ),
  },
  protein_name: {
    label: 'Protein names',
    render: data =>
      data.proteinDescription && (
        <ProteinNamesView {...convertProteinNames(data.proteinDescription)} />
      ),
  },
  gene_names: {
    label: 'Gene Names',
    render: data =>
      data.genes && <GeneNamesView {...convertGeneNames(data.genes)} />,
  },
  organism: {
    label: 'Organism',
    render: data => data.organism && <OrganismView data={data.organism} />,
  },
};

export default ColumnConfiguration;
