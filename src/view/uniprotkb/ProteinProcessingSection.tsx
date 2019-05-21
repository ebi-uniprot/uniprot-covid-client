import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import KeywordView from '../uniprotkb/components/KeywordView';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const ProteinProcessingSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const proteinProcessingData = data[EntrySectionType.ProteinProcessing];
  if (!hasContent(proteinProcessingData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.ProteinProcessing}>
        <FeaturesView
          features={proteinProcessingData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <KeywordView keywords={proteinProcessingData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default ProteinProcessingSection;
