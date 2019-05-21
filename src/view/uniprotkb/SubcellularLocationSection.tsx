import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import KeywordView from '../uniprotkb/components/KeywordView';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const SubcellularLocationSection: FC<{ data: UniProtkbUIModel }> = ({
  data,
}) => {
  const subcellularLocationData = data[EntrySectionType.SubCellularLocation];
  if (isEmpty(subcellularLocationData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.SubCellularLocation}>
        <KeywordView keywords={subcellularLocationData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default SubcellularLocationSection;
