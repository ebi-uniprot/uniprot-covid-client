import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import FeaturesView from '../../model/FeaturesView';
import { Keyword } from '../../model/Keyword';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const ProteinProcessingSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const proteinProcessingData = data[EntrySectionType.ProteinProcessing];
  if (isEmpty(proteinProcessingData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.ProteinProcessing}>
        <FeaturesView
          features={proteinProcessingData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <Keyword keywords={proteinProcessingData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default ProteinProcessingSection;
