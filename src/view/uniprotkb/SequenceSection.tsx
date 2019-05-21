import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import SequenceView from '../uniprotkb/components/SequenceView';
import { SequenceUIModel } from '../../model/uniprotkb/sections/SequenceConverter';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Sequence}>
        <SequenceView data={data} accession={primaryAccession} />
        <FeaturesView
          features={data.featuresData}
          sequence={data.sequence.value}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default SequenceSection;
