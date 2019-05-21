import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const ExpressionSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const expressionData = data[EntrySectionType.Expression];
  if (!hasContent(expressionData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Expression}>
        <FreeTextView
          comments={expressionData.tissueSpecificityData}
          includeTitle={true}
        />
        <FreeTextView
          comments={expressionData.inductionData}
          includeTitle={true}
        />
        <KeywordView keywords={expressionData.keywordData} />
        <XRefView
          xrefs={expressionData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default ExpressionSection;
