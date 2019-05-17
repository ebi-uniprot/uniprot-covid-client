import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySection';
import { Keyword } from '../../model/Keyword';
import { UniProtkbDataModel } from '../../model/uniprotkb/UniProtkbConverter';

const SubcellularLocationSection: FC<{ data: UniProtkbDataModel }> = ({
  data,
}) => {
  const subcellularLocationData = data[EntrySectionType.SubCellularLocation];
  if (isEmpty(subcellularLocationData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.SubCellularLocation}>
        <Keyword keywords={subcellularLocationData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default SubcellularLocationSection;
