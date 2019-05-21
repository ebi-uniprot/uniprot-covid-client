import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySectionType';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import SequenceView from '../uniprotkb/components/SequenceView';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const SequenceSection: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const sequenceData = data[EntrySectionType.Sequence];
  if (!hasContent(sequenceData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Sequence}>
        <SequenceView data={sequenceData} accession={data.primaryAccession} />
        <FeaturesView
          features={sequenceData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence.value}
        />
        <KeywordView keywords={sequenceData.keywordData} />
        <XRefView
          xrefs={sequenceData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default SequenceSection;
