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
    sectionContent: data => (
      <FunctionSection data={data} key={EntrySectionType.Function} />
    ),
  },
  // {
  //   name: EntrySectionType.NamesAndTaxonomy,
  //   sectionContent: data => <NamesAndTaxonomySection data={data} />,
  // },
  {
    name: EntrySectionType.PathologyAndBioTech,
    sectionContent: data => (
      <PathologyAndBiotechSection
        data={data}
        key={EntrySectionType.PathologyAndBioTech}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
