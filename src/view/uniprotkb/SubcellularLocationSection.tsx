import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
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
      <Card title={EntrySectionType.SubCellularLocation}>
        <KeywordView keywords={data.keywordData} />
      </Card>
    </Fragment>
  );
};

export default SubcellularLocationSection;
