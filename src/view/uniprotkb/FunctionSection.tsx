import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import CatalyticActivityView from '../uniprotkb/components/CatalyticActivityView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import EntrySectionType from '../../model/types/EntrySectionType';
import { hasContent } from '../../model/utils/utils';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const FunctionSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const functionData = data[EntrySectionType.Function];
  if (!hasContent(functionData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Function}>
        <FreeTextView comments={functionData.functionCommentsData} />
        <CatalyticActivityView comments={functionData.catalyticActivityData} />
        <FreeTextView
          comments={functionData.pathwayCommentsData}
          includeTitle={true}
        />
        <KeywordView keywords={functionData.keywordData} />
        <FeaturesView
          features={functionData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <XRefView
          xrefs={functionData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default FunctionSection;
