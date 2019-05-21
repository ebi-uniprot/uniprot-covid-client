import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { EntryProteinNames } from './components/ProteinNamesView';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const NamesAndTaxonomySection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const namesAndTaxonomyData = data[EntrySectionType.NamesAndTaxonomy];
  if (!hasContent(namesAndTaxonomyData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.NamesAndTaxonomy}>
        <EntryProteinNames {...namesAndTaxonomyData.proteinNamesData} />
      </Card>
    </Fragment>
  );
};

export default NamesAndTaxonomySection;
