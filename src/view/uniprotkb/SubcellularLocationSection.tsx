import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import KeywordView from '../uniprotkb/components/KeywordView';
import { SubcellularLocationUIModel } from '../../model/uniprotkb/sections/SubcellularLocationConverter';

const SubcellularLocationSection: FC<{ data: SubcellularLocationUIModel }> = ({
  data,
}) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.SubCellularLocation}>
        <KeywordView keywords={data.keywordData} />
      </Card>
    </Fragment>
  );
};

export default SubcellularLocationSection;
