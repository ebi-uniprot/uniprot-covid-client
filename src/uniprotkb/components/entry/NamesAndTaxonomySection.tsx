import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import ProteinNamesView from './ProteinNamesView';
import { hasContent } from '../../utils/utils';
import EntrySection from '../../types/EntrySection';
import { NamesAndTaxonomyUIModel } from '../../adapters/NamesAndTaxonomyConverter';
import GeneNamesView from './GeneNamesView';
import { OrganismListView } from './OrganismView';
import ProteomesListView from './ProteomesView';
import XRefView from './XRefView';

const NamesAndTaxonomySection: FC<{
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.NamesAndTaxonomy}>
      <Card title={EntrySection.NamesAndTaxonomy}>
        <h3>Protein names</h3>
        <ProteinNamesView proteinNames={data.proteinNamesData} />
        {data.geneNamesData && (
          <Fragment>
            <h3>Gene names</h3>
            <GeneNamesView geneNamesData={data.geneNamesData} />
          </Fragment>
        )}
        <h3>Organism names</h3>
        <OrganismListView data={data.organismData} hosts={data.organismHosts} />
        <h3>Proteome</h3>
        <ProteomesListView data={data.proteomesData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default NamesAndTaxonomySection;
