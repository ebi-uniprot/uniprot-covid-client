import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FeaturesView from './components/FeaturesView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import SequenceView from './components/SequenceView';
import { SequenceUIModel } from '../../model/uniprotkb/sections/SequenceConverter';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Sequence}>
      <Card title={EntrySection.Sequence}>
        <SequenceView data={data} accession={primaryAccession} />
        <FeaturesView
          features={data.featuresData}
          sequence={data.sequence.value}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default SequenceSection;
