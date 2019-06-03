import React from 'react';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import PathologyAndBiotechSection from './PathologyAndBiotechSection';
import EntrySection from '../../model/types/EntrySection';
import ProteinProcessingSection from './ProteinProcessingSection';
import ExpressionSection from './ExpressionSection';
import SubcellularLocationSection from './SubcellularLocationSection';
import SequenceSection from './SequenceSection';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const UniProtKBEntryConfig: {
  name: EntrySection;
  sectionContent: (entryData: any) => JSX.Element;
}[] = [
  {
    name: EntrySection.Function,
    sectionContent: (data: UniProtkbUIModel) => (
      <FunctionSection
        data={data[EntrySection.Function]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Function}
      />
    ),
  },
  {
    name: EntrySection.NamesAndTaxonomy,
    sectionContent: (data: UniProtkbUIModel) => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  {
    name: EntrySection.SubCellularLocation,
    sectionContent: (data: UniProtkbUIModel) => (
      <SubcellularLocationSection
        data={data[EntrySection.SubCellularLocation]}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    name: EntrySection.PathologyAndBioTech,
    sectionContent: (data: UniProtkbUIModel) => (
      <PathologyAndBiotechSection
        data={data[EntrySection.PathologyAndBioTech]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.PathologyAndBioTech}
      />
    ),
  },
  {
    name: EntrySection.ProteinProcessing,
    sectionContent: (data: UniProtkbUIModel) => (
      <ProteinProcessingSection
        data={data[EntrySection.ProteinProcessing]}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.ProteinProcessing}
      />
    ),
  },
  {
    name: EntrySection.Expression,
    sectionContent: (data: UniProtkbUIModel) => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Expression}
      />
    ),
  },
  {
    name: EntrySection.Sequence,
    sectionContent: (data: UniProtkbUIModel) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
