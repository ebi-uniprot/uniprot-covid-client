import React from 'react';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import PathologyAndBiotechSection from './PathologyAndBiotechSection';
import EntrySectionType from '../../model/types/EntrySectionType';
import ProteinProcessingSection from './ProteinProcessingSection';
import ExpressionSection from './ExpressionSection';
import SubcellularLocationSection from './SubcellularLocationSection';
import SequenceSection from './SequenceSection';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const UniProtKBEntryConfig: {
  name: EntrySectionType;
  sectionContent: (entryData: any) => JSX.Element;
}[] = [
  {
    name: EntrySectionType.Function,
    sectionContent: (data: UniProtkbUIModel) => (
      <FunctionSection
        data={data[EntrySectionType.Function]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySectionType.Sequence].sequence.value}
        key={EntrySectionType.Function}
      />
    ),
  },
  {
    name: EntrySectionType.NamesAndTaxonomy,
    sectionContent: (data: UniProtkbUIModel) => (
      <NamesAndTaxonomySection
        data={data[EntrySectionType.NamesAndTaxonomy]}
        key={EntrySectionType.NamesAndTaxonomy}
      />
    ),
  },
  {
    name: EntrySectionType.SubCellularLocation,
    sectionContent: (data: UniProtkbUIModel) => (
      <SubcellularLocationSection
        data={data[EntrySectionType.SubCellularLocation]}
        key={EntrySectionType.SubCellularLocation}
      />
    ),
  },
  {
    name: EntrySectionType.PathologyAndBioTech,
    sectionContent: (data: UniProtkbUIModel) => (
      <PathologyAndBiotechSection
        data={data[EntrySectionType.PathologyAndBioTech]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySectionType.Sequence].sequence.value}
        key={EntrySectionType.PathologyAndBioTech}
      />
    ),
  },
  {
    name: EntrySectionType.ProteinProcessing,
    sectionContent: (data: UniProtkbUIModel) => (
      <ProteinProcessingSection
        data={data[EntrySectionType.ProteinProcessing]}
        sequence={data[EntrySectionType.Sequence].sequence.value}
        key={EntrySectionType.ProteinProcessing}
      />
    ),
  },
  {
    name: EntrySectionType.Expression,
    sectionContent: (data: UniProtkbUIModel) => (
      <ExpressionSection
        data={data[EntrySectionType.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySectionType.Expression}
      />
    ),
  },
  {
    name: EntrySectionType.Sequence,
    sectionContent: (data: UniProtkbUIModel) => (
      <SequenceSection
        data={data[EntrySectionType.Sequence]}
        primaryAccession={data.primaryAccession}
        key={EntrySectionType.Sequence}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
