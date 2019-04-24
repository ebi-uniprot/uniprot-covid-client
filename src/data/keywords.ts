import KeywordCategory from '../model/types/keywordTypes';
import EntrySection from '../model/types/EntrySection';

const entrySectionToKeywordCategories = new Map<
  EntrySection,
  KeywordCategory[]
>();
entrySectionToKeywordCategories.set(EntrySection.Expression, [
  KeywordCategory.DEVELOPMENTAL_STAGE,
]);
entrySectionToKeywordCategories.set(EntrySection.ProteinProcessing, [
  KeywordCategory.PTM,
]);
entrySectionToKeywordCategories.set(EntrySection.SubCellularLocation, [
  KeywordCategory.CELLULAR_COMPONENT,
]);
entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
  KeywordCategory.TECHNICAL_TERM,
]);
entrySectionToKeywordCategories.set(EntrySection.PathologyOrBioTech, [
  KeywordCategory.DISEASE,
]);
entrySectionToKeywordCategories.set(EntrySection.FamilyAndDomains, [
  KeywordCategory.DOMAIN,
]);
entrySectionToKeywordCategories.set(EntrySection.Sequence, [
  KeywordCategory.CODING_SEQUENCE_DIVERSITY,
]);
entrySectionToKeywordCategories.set(EntrySection.Function, [
  KeywordCategory.MOLECULAR_FUNCTION,
  KeywordCategory.BIOLOGICAL_PROCESS,
  KeywordCategory.LIGAND,
]);

export default entrySectionToKeywordCategories;
