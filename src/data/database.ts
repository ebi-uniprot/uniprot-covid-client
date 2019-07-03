import { Database, DatabaseCategory } from '../model/types/DatabaseTypes';
import EntrySection from '../model/types/EntrySection';
import { DatabaseInfo } from '../model/types/DatabaseTypes';
import databaseInfoJson from './databaseInfo.json';

const databaseInfo: DatabaseInfo = databaseInfoJson;

export const databaseCategoryToString = {
  [DatabaseCategory.CHEMISTRY]: 'Chemistry',
  [DatabaseCategory.DOMAIN]: 'Family and domain databases',
  [DatabaseCategory.EXPRESSION]: 'Gene expression databases',
  [DatabaseCategory.FAMILY]: 'Protein family/group databases',
  [DatabaseCategory.GEL]: '2D gel databases',
  [DatabaseCategory.GENOME]: 'Genome annotation databases',
  [DatabaseCategory.INTERACTION]: 'Protein-protein interaction databases',
  [DatabaseCategory.ORGANISM]: 'Organism-specific databases',
  [DatabaseCategory.OTHER]: 'Other',
  [DatabaseCategory.PATHWAY]: 'Enzyme and pathway databases',
  [DatabaseCategory.PHYLOGENOMIC]: 'Phylogenomic databases',
  [DatabaseCategory.POLYMORPHISM]: 'Polymorphism and mutation databases',
  [DatabaseCategory.PROTEOMIC]: 'Proteomic databases',
  [DatabaseCategory.PROTOCOL]: 'Protocols and materials databases',
  [DatabaseCategory.PTM]: 'PTM databases',
  [DatabaseCategory.SEQUENCE]: 'Sequence databases',
  [DatabaseCategory.STRUCTURE]: '3D structure databases',
};

// f & g
// Object.keys(databaseCategoryToString).forEach(category => {
//   databaseCategoryToDatabaseNames[category] = [];
// });
const databaseCategoryToDatabaseNames = new Map<String, String[]>();
const databaseNamesToDatabaseCategory = new Map<String, String>();
databaseInfo.forEach(info => {
  const { name, category } = info;
  const databaseNames = databaseCategoryToDatabaseNames.get(category);
  databaseCategoryToDatabaseNames.set(
    category,
    databaseNames ? [...databaseNames, name] : [name]
  );
  databaseNamesToDatabaseCategory.set(name, category);
});

export const entrySectionToDatabaseNames = new Map<EntrySection, String[]>();
entrySectionToDatabaseNames.set(EntrySection.Expression, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.EXPRESSION],
  Database.HPA,
]);
entrySectionToDatabaseNames.set(EntrySection.FamilyAndDomains, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.FAMILY],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.PHYLOGENOMIC],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.DOMAIN],
]);
entrySectionToDatabaseNames.set(EntrySection.Function, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.PATHWAY],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.FAMILY],
  Database.SwissLipids,
]);
entrySectionToDatabaseNames.set(EntrySection.Interaction, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.INTERACTION],
  Database.BindingDB,
]);
entrySectionToDatabaseNames.set(EntrySection.NamesAndTaxonomy, [
  Database.ArachnoServer,
  Database.Araport,
  Database.CGD,
  Database.ConoServer,
  Database.dictyBase,
  Database.EcoGene,
  Database.EuPathDB,
  Database.FlyBase,
  Database.Gramene,
  Database.HGNC,
  Database.LegioList,
  Database.Leproma,
  Database.MaizeGDB,
  Database.MGI,
  Database.MIM,
  Database.neXtProt,
  Database.PomBase,
  Database.PseudoCAP,
  Database.RGD,
  Database.SGD,
  Database.TAIR,
  Database.TubercuList,
  Database.VGNC,
  Database.WormBase,
  Database.Xenbase,
  Database.ZFIN,
]);
entrySectionToDatabaseNames.set(EntrySection.PathologyAndBioTech, [
  Database.Allergome,
  Database.BioMuta,
  Database.ChEMBL,
  Database.DisGeNET,
  Database.DMDM,
  Database.DrugBank,
  Database.GeneReviews,
  Database.GuidetoPHARMACOLOGY,
  Database.MalaCards,
  Database.MIM,
  Database.OpenTargets,
  Database.Orphanet,
  Database.PharmGKB,
]);
entrySectionToDatabaseNames.set(EntrySection.ProteinProcessing, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.PROTEOMIC],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.GEL],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.PTM],
  Database.PMAP_CutDB,
]);
entrySectionToDatabaseNames.set(EntrySection.Sequence, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.SEQUENCE],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.GENOME],
  ...databaseCategoryToDatabaseNames[DatabaseCategory.POLYMORPHISM],
]);
entrySectionToDatabaseNames.set(EntrySection.Structure, [
  ...databaseCategoryToDatabaseNames[DatabaseCategory.STRUCTURE],
  Database.PDB,
  Database.PDBsum,
  Database.EvolutionaryTrace,
]);

const entrySectionToDatabaseCategoriesOrder = new Map<EntrySection, String[]>();

for (const [entrySection, databaseNames] of entrySectionToDatabaseNames) {
  entrySectionToDatabaseCategoriesOrder.set(entrySection, [
    ...new Set(databaseNames),
  ]);
}

console.log(JSON.stringify([...entrySectionToDatabaseNames]));
