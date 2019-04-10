import DatabaseCategory from './DatabaseCategory';
import EntrySection from './EntrySection';

const databaseCategoryToDatabases = new Map<EntrySection, DatabaseCategory[]>();

databaseCategoryToDatabases.set(EntrySection.Expression, [
  DatabaseCategory.ORGANISM,
  DatabaseCategory.EXPRESSION,
]);

databaseCategoryToDatabases.set(EntrySection.FamilyAndDomains, [
  DatabaseCategory.FAMILY,
  DatabaseCategory.PHYLOGENOMIC,
  DatabaseCategory.DOMAIN,
]);

databaseCategoryToDatabases.set(EntrySection.Function, [
  DatabaseCategory.PATHWAY,
  DatabaseCategory.FAMILY,
]);

databaseCategoryToDatabases.set(EntrySection.Interaction, [
  DatabaseCategory.INTERACTION,
  DatabaseCategory.CHEMISTRY,
]);

databaseCategoryToDatabases.set(EntrySection.NamesAndTaxonomy, [
  DatabaseCategory.ORGANISM,
]);

databaseCategoryToDatabases.set(EntrySection.PathologyOrBioTech, [
  DatabaseCategory.ORGANISM,
  DatabaseCategory.OTHER,
  DatabaseCategory.FAMILY,
  DatabaseCategory.CHEMISTRY,
  DatabaseCategory.POLYMORPHISM,
]);

databaseCategoryToDatabases.set(EntrySection.ProteinProcessing, [
  DatabaseCategory.PROTEOMIC,
  DatabaseCategory.GEL,
  DatabaseCategory.PTM,
  DatabaseCategory.OTHER,
]);

databaseCategoryToDatabases.set(EntrySection.Sequence, [
  DatabaseCategory.SEQUENCE,
  DatabaseCategory.GENOME,
  DatabaseCategory.POLYMORPHISM,
]);

databaseCategoryToDatabases.set(EntrySection.Structure, [
  DatabaseCategory.STRUCTURE,
  DatabaseCategory.PROTOCOL,
  DatabaseCategory.OTHER,
]);

export default databaseCategoryToDatabases;
