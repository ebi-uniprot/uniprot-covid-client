import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { EntryProteinNames } from './components/ProteinNamesView';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { NamesAndTaxonomyUIModel } from '../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import { GeneNamesListView } from './components/GeneNamesView';

const NamesAndTaxonomySection: FC<{ data: NamesAndTaxonomyUIModel }> = ({
  data,
}) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.NamesAndTaxonomy}>
        <h4>Protein names</h4>
        <EntryProteinNames proteinNames={data.proteinNamesData} />
        <h4>Gene names</h4>
        <GeneNamesListView {...data.geneNamesData} />
      </Card>
    </Fragment>
  );
};

export default NamesAndTaxonomySection;
