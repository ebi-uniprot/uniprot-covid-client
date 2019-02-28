import React from 'react';
import SimpleView from './SimpleView';
import { ProteinNames, ProteinNamesData } from './ProteinNames';
import { GeneNames, GeneNamesData } from './GeneNames';
import { Organism, OrganismData } from './Organism';

const FieldToViewMappings: {
  [index: string]: (data: any) => JSX.Element | undefined;
} = {
  accession: (data: { primaryAccession: string }) => (
    <SimpleView
      termValue={data.primaryAccession}
      linkTo={`/uniprotkb/${data.primaryAccession}`}
    />
  ),
  id: (data: { uniProtId: string }) => (
    <SimpleView termValue={data.uniProtId} />
  ),
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
