import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import hasContent from '../../model/utils/utils';
import FreeTextView from './components/FreeTextView';
import CatalyticActivityView from './components/CatalyticActivityView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import FeaturesView from './components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import Comment from '../../model/types/Comment';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import GoRibbon from './components/GoRibbon';

const FunctionSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null=> {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Function}>
      <Card title={EntrySection.Function}>
        <FreeTextView comments={data.commentsData.get(Comment.FUNCTION)} />
        <CatalyticActivityView
          comments={data.commentsData.get(Comment.CATALYTIC_ACTIVITY)}
        />
        <FreeTextView
          comments={data.commentsData.get(Comment.PATHWAY)}
          includeTitle
        />
        <FreeTextView
          comments={data.commentsData.get(Comment.MISCELLANEOUS)}
          includeTitle
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <GoRibbon primaryAccession={primaryAccession} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FunctionSection;
