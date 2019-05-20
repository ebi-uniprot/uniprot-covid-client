import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import { FreeText } from '../../model/FreeText';
import { Keyword } from '../../model/Keyword';
import XRef from '../../model/XRef';
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
