import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../utils/utils';
import EntrySection from '../../types/EntrySection';
import FeaturesView from './FeaturesView';
import KeywordView from './KeywordView';
import XRefView from './XRefView';
import FreeTextView from './FreeTextView';
import { CommentType, FreeTextComment } from '../../types/CommentTypes';
import { UIModel } from '../../adapters/SectionConverter';

const ProteinProcessingSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  const { featuresData, keywordData, xrefData, commentsData } = data;
  return (
    <div id={EntrySection.ProteinProcessing}>
      <Card title={EntrySection.ProteinProcessing}>
        <FeaturesView features={featuresData} sequence={sequence} />
        <FreeTextView
          comments={commentsData.get(CommentType.PTM) as FreeTextComment[]}
          title={CommentType.PTM.toLowerCase()}
        />
        <KeywordView keywords={keywordData} />
        <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ProteinProcessingSection;
