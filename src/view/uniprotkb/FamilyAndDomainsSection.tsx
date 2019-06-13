import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { FamilyAndDomainsUIModel } from '../../model/uniprotkb/sections/FamilyAndDomainsConverter';
import Comment from '../../model/types/Comment';

const FamilyAndDomainsSection: FC<{
  data: FamilyAndDomainsUIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  const domainsComments = data.commentsData.get(Comment.DOMAIN);
  const similarityComments = data.commentsData.get(Comment.SIMILARITY);
  return (
    <Fragment>
      <Card title={EntrySection.FamilyAndDomains}>
        <FeaturesView features={data.featuresData} sequence={sequence} />
        {domainsComments && (
          <FreeTextView comments={domainsComments} includeTitle={true} />
        )}
        {similarityComments && (
          <FreeTextView comments={similarityComments} includeTitle={true} />
        )}
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default FamilyAndDomainsSection;
