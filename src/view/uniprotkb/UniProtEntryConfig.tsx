import React from 'react';
import idx from 'idx';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import PathologyAndBiotechSection from './PathologyAndBiotechSection';
import EntrySection from '../../model/types/EntrySection';
import ProteinProcessingSection from './ProteinProcessingSection';
import ExpressionSection from './ExpressionSection';
import SubcellularLocationSection from './SubcellularLocationSection';
import SequenceSection from './SequenceSection';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';
import InteractionSection from './InteractionSection';
import FamilyAndDomainsSection from './FamilyAndDomainsSection';
import StructureSection from './StructureSection';
import { FunctionUIModel } from '../../model/uniprotkb/sections/FunctionConverter';

const UniProtKBEntryConfig: {
  name: EntrySection;
  sectionContent: (entryData: UniProtkbUIModel) => JSX.Element;
}[] = [
  {
    name: EntrySection.Function,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <FunctionSection
        data={data[EntrySection.Function] as FunctionUIModel}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Function}
      />
    ),
  },
  {
    name: EntrySection.NamesAndTaxonomy,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  {
    name: EntrySection.SubCellularLocation,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <SubcellularLocationSection
        data={data[EntrySection.SubCellularLocation]}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    name: EntrySection.PathologyAndBioTech,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
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
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <ProteinProcessingSection
        data={data[EntrySection.ProteinProcessing]}
        sequence={data[EntrySection.Sequence].sequence.value}
        primaryAccession={data.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />
    ),
  },
  {
    name: EntrySection.Expression,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    name: EntrySection.Interaction,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <InteractionSection
        data={data[EntrySection.Interaction]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    name: EntrySection.Structure,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <StructureSection
        data={data[EntrySection.Structure]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Structure}
        crc64={
          idx(data, o => o[EntrySection.Sequence].sequence.crc64) || undefined
        }
      />
    ),
  },
  {
    name: EntrySection.FamilyAndDomains,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <FamilyAndDomainsSection
        data={data[EntrySection.FamilyAndDomains]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Expression}
      />
    ),
  },
  {
    name: EntrySection.Sequence,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
