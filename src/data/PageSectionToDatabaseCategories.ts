import DatabaseCategory from './DatabaseCategory';

export default {
  Expression: [DatabaseCategory.ORGANISM, DatabaseCategory.EXPRESSION],
  FamilyAndDomains: [
    DatabaseCategory.FAMILY,
    DatabaseCategory.PHYLOGENOMIC,
    DatabaseCategory.DOMAIN,
  ],
  Function: [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY],
  Interaction: [DatabaseCategory.INTERACTION, DatabaseCategory.CHEMISTRY],
  NamesAndTaxonomy: [DatabaseCategory.ORGANISM],
  PathologyOrBioTech: [
    DatabaseCategory.ORGANISM,
    DatabaseCategory.OTHER,
    DatabaseCategory.FAMILY,
    DatabaseCategory.CHEMISTRY,
    DatabaseCategory.POLYMORPHISM,
  ],
  ProteinProcessing: [
    DatabaseCategory.PROTEOMIC,
    DatabaseCategory.GEL,
    DatabaseCategory.PTM,
    DatabaseCategory.OTHER,
  ],
  Sequence: [
    DatabaseCategory.SEQUENCE,
    DatabaseCategory.GENOME,
    DatabaseCategory.POLYMORPHISM,
  ],
  Structure: [
    DatabaseCategory.STRUCTURE,
    DatabaseCategory.PROTOCOL,
    DatabaseCategory.OTHER,
  ],
};
