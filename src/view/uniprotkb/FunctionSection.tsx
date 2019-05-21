import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { FreeText } from '../uniprotkb/components/FreeTextView';
import { CatalyticActivity } from '../uniprotkb/components/CatalyticActivityView';
import { Keyword } from '../uniprotkb/components/KeywordView';
import { XRef } from '../uniprotkb/components/XRefView';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import EntrySectionType from '../../model/types/EntrySectionType';
import { isEmpty } from '../../model/utils/utils';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const FunctionSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const functionData = data[EntrySectionType.Function];
  if (isEmpty(functionData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Function}>
        <FreeText comments={functionData.functionCommentsData} />
        <CatalyticActivity comments={functionData.catalyticActivityData} />
        <FreeText
          comments={functionData.pathwayCommentsData}
          includeTitle={true}
        />
        <Keyword keywords={functionData.keywordData} />
        <FeaturesView
          features={functionData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <XRef
          xrefs={functionData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default FunctionSection;
