import DatabaseCategory from './DatabaseCategory';
import EntrySection from './EntrySection';

const entrySectionToDatabaseCategories = new Map<
  EntrySection,
  DatabaseCategory[]
>();

entrySectionToDatabaseCategories.set(EntrySection.Expression, [
  DatabaseCategory.ORGANISM,
  DatabaseCategory.EXPRESSION,
]);

entrySectionToDatabaseCategories.set(EntrySection.FamilyAndDomains, [
  DatabaseCategory.FAMILY,
  DatabaseCategory.PHYLOGENOMIC,
  DatabaseCategory.DOMAIN,
]);

entrySectionToDatabaseCategories.set(EntrySection.Function, [
  DatabaseCategory.PATHWAY,
  DatabaseCategory.FAMILY,
]);

entrySectionToDatabaseCategories.set(EntrySection.Interaction, [
  DatabaseCategory.INTERACTION,
  DatabaseCategory.CHEMISTRY,
]);

entrySectionToDatabaseCategories.set(EntrySection.NamesAndTaxonomy, [
  DatabaseCategory.ORGANISM,
]);

entrySectionToDatabaseCategories.set(EntrySection.PathologyOrBioTech, [
  DatabaseCategory.ORGANISM,
  DatabaseCategory.OTHER,
  DatabaseCategory.FAMILY,
  DatabaseCategory.CHEMISTRY,
  DatabaseCategory.POLYMORPHISM,
]);

entrySectionToDatabaseCategories.set(EntrySection.ProteinProcessing, [
  DatabaseCategory.PROTEOMIC,
  DatabaseCategory.GEL,
  DatabaseCategory.PTM,
  DatabaseCategory.OTHER,
]);

entrySectionToDatabaseCategories.set(EntrySection.Sequence, [
  DatabaseCategory.SEQUENCE,
  DatabaseCategory.GENOME,
  DatabaseCategory.POLYMORPHISM,
]);

entrySectionToDatabaseCategories.set(EntrySection.Structure, [
  DatabaseCategory.STRUCTURE,
  DatabaseCategory.PROTOCOL,
  DatabaseCategory.OTHER,
]);

export default entrySectionToDatabaseCategories;
