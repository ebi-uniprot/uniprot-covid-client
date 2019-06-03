import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import KeywordView from '../uniprotkb/components/KeywordView';
import { ProteinProcessingUIModel } from '../../model/uniprotkb/sections/ProteinProcessingConverter';

const ProteinProcessingSection: FC<{
  data: ProteinProcessingUIModel;
  sequence: string;
}> = ({ data, sequence }) => {
  if (!hasContent(data)) {
    return null;
  }
  const { featuresData, keywordData } = data;
  return (
    <Fragment>
      <Card title={EntrySection.ProteinProcessing}>
        <FeaturesView features={featuresData} sequence={sequence} />
        <KeywordView keywords={keywordData} />
      </Card>
    </Fragment>
  );
};

export default ProteinProcessingSection;
