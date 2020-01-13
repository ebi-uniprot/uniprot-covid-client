import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FeaturesView from './components/FeaturesView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import SequenceView, {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
} from './components/SequenceView';
import { SequenceUIModel } from '../../model/uniprotkb/sections/SequenceConverter';
import FreeTextView from './components/FreeTextView';

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
        {data.sequenceCaution && data.sequenceCaution.length > 0 && (
          <Fragment>
            <h4>Sequence caution</h4>
            <SequenceCautionView data={data.sequenceCaution} />
          </Fragment>
        )}
        {data.massSpectrometry && data.massSpectrometry.length > 0 && (
          <Fragment>
            <h4>Mass Spectrometry</h4>
            <MassSpectrometryView data={data.massSpectrometry} />
          </Fragment>
        )}
        {data.polymorphysm && data.polymorphysm.length > 0 && (
          <Fragment>
            <h4>Polymorphysm</h4>
            <FreeTextView comments={data.polymorphysm} />
          </Fragment>
        )}
        {data.rnaEditing && data.rnaEditing.length > 0 && (
          <Fragment>
            <h4>RNA Editing</h4>
            <RNAEditingView data={data.rnaEditing} />
          </Fragment>
        )}
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default SequenceSection;
