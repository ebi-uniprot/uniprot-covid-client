import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySection';
import FeaturesView from '../../model/FeaturesView';
import { Keyword } from '../../model/Keyword';

const ProteinProcessingSection: FC<{ data }> = ({ data }) => {
  const proteinProcessingData = data[EntrySectionType.ProteinProcessing];
  if (isEmpty(proteinProcessingData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.ProteinProcessing}>
        <FeaturesView
          features={proteinProcessingData.featuresData}
          sequence={data.sequence}
        />
        <Keyword keywords={proteinProcessingData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default ProteinProcessingSection;
