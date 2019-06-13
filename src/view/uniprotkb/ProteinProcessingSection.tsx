import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import KeywordView from '../uniprotkb/components/KeywordView';
import { ProteinProcessingUIModel } from '../../model/uniprotkb/sections/ProteinProcessingConverter';
import XRefView from './components/XRefView';
import FreeTextView from './components/FreeTextView';
import Comment from '../../model/types/Comment';

const ProteinProcessingSection: FC<{
  data: ProteinProcessingUIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, sequence, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  const { featuresData, keywordData, xrefData, commentsData } = data;
  return (
    <Fragment>
      <Card title={EntrySection.ProteinProcessing}>
        <FeaturesView features={featuresData} sequence={sequence} />
        <FreeTextView
          comments={commentsData.get(Comment.PTM)}
          includeTitle={true}
        />
        <KeywordView keywords={keywordData} />
        <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default ProteinProcessingSection;
