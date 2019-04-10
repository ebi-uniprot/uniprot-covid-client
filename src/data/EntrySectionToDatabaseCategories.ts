import DatabaseCategory from './DatabaseCategory';
import EntrySection from './EntrySection';

const databaseCategoryToDatabases = new Map<EntrySection, DatabaseCategory[]>([
  [
    EntrySection.Expression,
    [DatabaseCategory.ORGANISM, DatabaseCategory.EXPRESSION],
  ],
  [
    EntrySection.FamilyAndDomains,
    [
      DatabaseCategory.FAMILY,
      DatabaseCategory.PHYLOGENOMIC,
      DatabaseCategory.DOMAIN,
    ],
  ],
  [EntrySection.Function, [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY]],
  [
    EntrySection.Interaction,
    [DatabaseCategory.INTERACTION, DatabaseCategory.CHEMISTRY],
  ],
  [EntrySection.NamesAndTaxonomy, [DatabaseCategory.ORGANISM]],
  [
    EntrySection.PathologyOrBioTech,
    [
      DatabaseCategory.ORGANISM,
      DatabaseCategory.OTHER,
      DatabaseCategory.FAMILY,
      DatabaseCategory.CHEMISTRY,
      DatabaseCategory.POLYMORPHISM,
    ],
  ],
  [
    EntrySection.ProteinProcessing,
    [
      DatabaseCategory.PROTEOMIC,
      DatabaseCategory.GEL,
      DatabaseCategory.PTM,
      DatabaseCategory.OTHER,
    ],
  ],
  [
    EntrySection.Sequence,
    [
      DatabaseCategory.SEQUENCE,
      DatabaseCategory.GENOME,
      DatabaseCategory.POLYMORPHISM,
    ],
  ],
  [
    EntrySection.Structure,
    [
      DatabaseCategory.STRUCTURE,
      DatabaseCategory.PROTOCOL,
      DatabaseCategory.OTHER,
    ],
  ],
]);

export default databaseCategoryToDatabases;
