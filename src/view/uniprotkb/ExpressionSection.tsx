import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import { ExpressionUIModel } from '../../model/uniprotkb/sections/ExpressionConverter';

const ExpressionSection: FC<{
  data: ExpressionUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Expression}>
        <FreeTextView
          comments={data.tissueSpecificityData}
          includeTitle={true}
        />
        <FreeTextView comments={data.inductionData} includeTitle={true} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default ExpressionSection;
