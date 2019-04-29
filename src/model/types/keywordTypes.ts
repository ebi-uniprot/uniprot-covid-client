import EntrySection from './EntrySection';

export enum KeywordCategory {
  BIOLOGICAL_PROCESS = 'Biological process',
  CELLULAR_COMPONENT = 'Cellular component',
  CODING_SEQUENCE_DIVERSITY = 'Coding sequence diversity',
  DEVELOPMENTAL_STAGE = 'Developmental stage',
  DISEASE = 'Disease',
  DOMAIN = 'Domain',
  LIGAND = 'Ligand',
  MOLECULAR_FUNCTION = 'Molecular function',
  PTM = 'PTM',
  TECHNICAL_TERM = 'Technical term',
}

export const entrySectionToKeywordCategories = new Map<
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

export default KeywordCategory;
