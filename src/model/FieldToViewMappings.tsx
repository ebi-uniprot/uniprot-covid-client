import React from 'react';
import SimpleView from './SimpleView';
import { ProteinNames, ProteinNamesData } from './ProteinNames';
import { GeneNames, GeneNamesData } from './GeneNames';
import { Organism, OrganismData } from './Organism';

const FieldToViewMappings: {
  [index: string]: (row: any) => JSX.Element | undefined;
} = {
  accession: (row: { primaryAccession: string }) => (
    <SimpleView
      termValue={row.primaryAccession}
      linkTo={`/uniprotkb/${row.primaryAccession}`}
    />
  ),
  id: (row: { uniProtId: string }) => <SimpleView termValue={row.uniProtId} />,
  protein_name: (data: ProteinNamesData) => {
    return <ProteinNames data={data} />;
  },
  gene_names: (data: GeneNamesData) => {
    return <GeneNames data={data} />;
  },
  organism: (data: OrganismData) => {
    return <Organism data={data} />;
  },
};

export default FieldToViewMappings;
