import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import { FreeText } from '../uniprotkb/components/FreeTextView';
import { Keyword } from '../uniprotkb/components/KeywordView';
import XRef from '../uniprotkb/components/XRefView';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const ExpressionSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const expressionData = data[EntrySectionType.Expression];
  if (isEmpty(expressionData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Expression}>
        <FreeText
          comments={expressionData.tissueSpecificityData}
          includeTitle={true}
        />
        <FreeText comments={expressionData.inductionData} includeTitle={true} />
        <Keyword keywords={expressionData.keywordData} />
        <XRef
          xrefs={expressionData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default ExpressionSection;
