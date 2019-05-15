import React from 'react';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import PathologyAndBiotechSection from './PathologyAndBiotechSection';
import EntrySectionType from '../../model/types/EntrySection';

const UniProtKBEntryConfig: {
  name: EntrySectionType;
  sectionContent: (entryData: any) => JSX.Element;
}[] = [
  {
    name: EntrySectionType.Function,
    sectionContent: entryData => <FunctionSection entryData={entryData} />,
  },
  // {
  //   name: EntrySectionType.Function,
  //   sectionContent: entryData => <FunctionSection entryData={entryData} />,
  // },
  // {
  //   name: EntrySectionType.NamesAndTaxonomy,
  //   sectionContent: entryData => (
  //     <NamesAndTaxonomySection entryData={entryData} />
  //   ),
  // },
  // {
  //   name: EntrySectionType.PathologyAndBioTech,
  //   sectionContent: entryData => (
  //     <PathologyAndBiotechSection entryData={entryData} />
  //   ),
  // },
];

export default UniProtKBEntryConfig;
