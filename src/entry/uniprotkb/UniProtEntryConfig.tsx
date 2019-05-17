import React from 'react';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import PathologyAndBiotechSection from './PathologyAndBiotechSection';
import EntrySectionType from '../../model/types/EntrySection';
import ProteinProcessingSection from './ProteinProcessingSection';
import ExpressionSection from './ExpressionSection';
import SubcellularLocationSection from './SubcellularLocationSection';

const UniProtKBEntryConfig: {
  name: EntrySectionType;
  sectionContent: (entryData: any) => JSX.Element;
}[] = [
  {
    name: EntrySectionType.Function,
    sectionContent: data => (
      <FunctionSection data={data} key={EntrySectionType.Function} />
    ),
  },
  {
    name: EntrySectionType.NamesAndTaxonomy,
    sectionContent: data => (
      <NamesAndTaxonomySection
        data={data}
        key={EntrySectionType.NamesAndTaxonomy}
      />
    ),
  },
  {
    name: EntrySectionType.SubCellularLocation,
    sectionContent: data => (
      <SubcellularLocationSection
        data={data}
        key={EntrySectionType.SubCellularLocation}
      />
    ),
  },
  {
    name: EntrySectionType.PathologyAndBioTech,
    sectionContent: data => (
      <PathologyAndBiotechSection
        data={data}
        key={EntrySectionType.PathologyAndBioTech}
      />
    ),
  },
  {
    name: EntrySectionType.ProteinProcessing,
    sectionContent: data => (
      <ProteinProcessingSection
        data={data}
        key={EntrySectionType.ProteinProcessing}
      />
    ),
  },
  {
    name: EntrySectionType.Expression,
    sectionContent: data => (
      <ExpressionSection data={data} key={EntrySectionType.Expression} />
    ),
  },
];

export default UniProtKBEntryConfig;
