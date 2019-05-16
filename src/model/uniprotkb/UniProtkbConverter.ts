import EntrySectionType from '../types/EntrySection';
import functionConverter from './sections/FunctionConverter';
import { FreeTextData } from '../FreeText';
import { CatalyticActivityData } from '../CatalyticActivity';
import { KeywordData } from '../Keyword';
import { FeatureData } from '../FeaturesView';
import { DatabaseCrossReference } from '../XRef';
import pathologyAndBiotechConverter from './sections/PathologyAndBiotechConverter';

type data = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData;
  keywords?: KeywordData;
  features?: FeatureData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};

const uniProtKbConverter = (data: data) => {
  return {
    primaryAccession: data.primaryAccession,
    [EntrySectionType.Function]: functionConverter(data),
    [EntrySectionType.PathologyAndBioTech]: pathologyAndBiotechConverter(data),
    sequence: data.sequence,
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// export const entrySectionToKeywordCategories = new Map<
//   EntrySection,
//   KeywordCategory[]
// >();
// entrySectionToKeywordCategories.set(EntrySection.Expression, [
//   KeywordCategory.DEVELOPMENTAL_STAGE,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.ProteinProcessing, [
//   KeywordCategory.PTM,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.SubCellularLocation, [
//   KeywordCategory.CELLULAR_COMPONENT,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.FamilyAndDomains, [
//   KeywordCategory.DOMAIN,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.Sequence, [
//   KeywordCategory.CODING_SEQUENCE_DIVERSITY,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.Function, [
//   KeywordCategory.MOLECULAR_FUNCTION,
//   KeywordCategory.BIOLOGICAL_PROCESS,
//   KeywordCategory.LIGAND,
// ]);
