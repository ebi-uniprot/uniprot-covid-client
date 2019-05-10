import React from 'react';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import EntrySectionType from '../../model/types/EntrySection';

const UniProtKBEntryConfig = new Map<
  EntrySectionType,
  (entryData: any) => JSX.Element
>([
  [
    EntrySectionType.Function,
    entryData => <FunctionSection entryData={entryData} />,
  ],
  [
    EntrySectionType.NamesAndTaxonomy,
    entryData => <NamesAndTaxonomySection entryData={entryData} />,
  ],
  [
    EntrySectionType.PathologyAndBioTech,
    entryData => <NamesAndTaxonomySection entryData={entryData} />,
  ],
]);

export default UniProtKBEntryConfig;
