import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { EntryProteinNames } from './components/ProteinNamesView';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { NamesAndTaxonomyUIModel } from '../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

const NamesAndTaxonomySection: FC<{ data: NamesAndTaxonomyUIModel }> = ({
  data,
}) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.NamesAndTaxonomy}>
        <EntryProteinNames {...data.proteinNamesData} />
      </Card>
    </Fragment>
  );
};

export default NamesAndTaxonomySection;
