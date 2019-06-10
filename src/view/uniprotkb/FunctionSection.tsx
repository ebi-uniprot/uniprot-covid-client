import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import CatalyticActivityView from '../uniprotkb/components/CatalyticActivityView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { FunctionUIModel } from '../../model/uniprotkb/sections/FunctionConverter';

const FunctionSection: FC<{
  data: FunctionUIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.Function}>
        <FreeTextView comments={data.functionCommentsData} />
        <CatalyticActivityView comments={data.catalyticActivityData} />
        <FreeTextView comments={data.pathwayCommentsData} includeTitle={true} />
        <FreeTextView comments={data.miscellaneousData} includeTitle={true} />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default FunctionSection;
