import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { FamilyAndDomainsUIModel } from '../../model/uniprotkb/sections/FamilyAndDomainsConverter';

const FamilyAndDomainsSection: FC<{
  data: FamilyAndDomainsUIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.FamilyAndDomains}>
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <FreeTextView comments={data.commentsData} includeTitle={true} />
        <FreeTextView
          comments={data.similarityCommentsData}
          includeTitle={true}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default FamilyAndDomainsSection;
