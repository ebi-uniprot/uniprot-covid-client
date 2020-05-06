import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from './FreeTextView';
import KeywordView from './KeywordView';
import XRefView from './XRefView';
import FeaturesView from './FeaturesView';
import EntrySection from '../../types/EntrySection';
import { hasContent } from '../../utils/utils';
import { CommentType, FreeTextComment } from '../../types/CommentTypes';
import { UIModel } from '../../adapters/SectionConverter';

const FamilyAndDomainsSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.FamilyAndDomains}>
      <Card title={EntrySection.FamilyAndDomains}>
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.DOMAIN) as FreeTextComment[]
          }
          title={CommentType.DOMAIN.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.SIMILARITY) as FreeTextComment[]
          }
          title={CommentType.SIMILARITY.toLowerCase()}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FamilyAndDomainsSection;
