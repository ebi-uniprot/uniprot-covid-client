import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { isEmpty } from '../../model/utils/utils';
import EntrySectionType from '../../model/types/EntrySection';
import FeaturesView from '../../model/FeaturesView';
import { Keyword } from '../../model/Keyword';
import XRef from '../../model/XRef';
import { SequenceViewEntry } from '../../model/SequenceView';

const SequenceSection: FC<{ data }> = ({ data }) => {
  const sequenceData = data[EntrySectionType.Sequence];
  if (isEmpty(sequenceData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Sequence}>
        <SequenceViewEntry data={sequenceData} />
        <FeaturesView
          features={sequenceData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <Keyword keywords={sequenceData.keywordData} />
        <XRef
          xrefs={sequenceData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default SequenceSection;
