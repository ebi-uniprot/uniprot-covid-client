import { Database, DatabaseCategory } from '../model/types/databaseTypes';
import EntrySection from '../model/types/EntrySection';

export const databaseCategoryToString = new Map<DatabaseCategory, string>([
  [DatabaseCategory.SEQUENCE, 'Sequence databases'],
  [DatabaseCategory.STRUCTURE, '3D structure databases'],
  [DatabaseCategory.INTERACTION, 'Protein-protein interaction databases'],
  [DatabaseCategory.CHEMISTRY, 'Chemistry'],
  [DatabaseCategory.FAMILY, 'Protein family/group databases'],
  [DatabaseCategory.PTM, 'PTM databases'],
  [DatabaseCategory.POLYMORPHISM, 'Polymorphism and mutation databases'],
  [DatabaseCategory.GEL, '2D gel databases'],
  [DatabaseCategory.PROTEOMIC, 'Proteomic databases'],
  [DatabaseCategory.PROTOCOL, 'Protocols and materials databases'],
  [DatabaseCategory.GENOME, 'Genome annotation databases'],
  [DatabaseCategory.ORGANISM, 'Organism-specific databases'],
  [DatabaseCategory.PHYLOGENOMIC, 'Phylogenomic databases'],
  [DatabaseCategory.PATHWAY, 'Enzyme and pathway databases'],
  [DatabaseCategory.EXPRESSION, 'Gene expression databases'],
  [DatabaseCategory.DOMAIN, 'Family and domain databases'],
  [DatabaseCategory.OTHER, 'Other'],
]);

const databaseCategoryToDatabases = new Map<DatabaseCategory, Database[]>();
databaseCategoryToDatabases.set(DatabaseCategory.SEQUENCE, [
  // Not found: EMBL/GenBank/DDBJ
  Database.EMBL,
  Database.CCDS,
  Database.PIR,
  Database.RefSeq,
  Database.UniGene,
]);
databaseCategoryToDatabases.set(DatabaseCategory.STRUCTURE, [
  Database.PDB,
  Database.SMR,
  Database.DisProt,
  Database.ProteinModelPortal,
]);
databaseCategoryToDatabases.set(DatabaseCategory.INTERACTION, [
  Database.BioGrid,
  Database.DIP,
  Database.IntAct,
  Database.MINT,
  Database.STRING,
]);
databaseCategoryToDatabases.set(DatabaseCategory.CHEMISTRY, [
  Database.BindingDB,
  Database.ChEMBL,
  Database.DrugBank,
  Database.GuidetoPHARMACOLOGY,
]);
databaseCategoryToDatabases.set(DatabaseCategory.FAMILY, [
  // Not found: Database.PptaseDB,
  Database.Allergome,
  Database.CAZy,
  Database.MEROPS,
  Database.MoonProt,
  Database.mycoCLAP,
  Database.PeroxiBase,
  Database.REBASE,
  Database.TCDB,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PTM, [
  // Not found: DEPOD, PhosphoSite, PhosSite
  Database.DEPOD,
  Database.PhosphoSitePlus,
  Database.UniCarbKB,
]);
databaseCategoryToDatabases.set(DatabaseCategory.POLYMORPHISM, [
  Database.dbSNP,
  Database.DMDM,
]);
databaseCategoryToDatabases.set(DatabaseCategory.GEL, [
  Database.SWISS_2DPAGE,
  Database.COMPLUYEAST_2DPAGE,
  Database.DOSAC_COBS_2DPAGE,
  Database.OGP,
  Database.REPRODUCTION_2DPAGE,
  Database.UCD_2DPAGE,
  Database.World_2DPAGE,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PROTEOMIC, [
  Database.MaxQB,
  Database.PaxDb,
  Database.PeptideAtlas,
  Database.PRIDE,
  Database.ProMEX,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PROTOCOL, [Database.DNASU]);
databaseCategoryToDatabases.set(DatabaseCategory.GENOME, [
  Database.Ensembl,
  Database.EnsemblBacteria,
  Database.EnsemblFungi,
  Database.EnsemblMetazoa,
  Database.EnsemblPlants,
  Database.EnsemblProtists,
  Database.GeneCards,
  Database.GeneID,
  Database.KEGG,
  Database.PATRIC,
  Database.UCSC,
  Database.VectorBase,
]);
databaseCategoryToDatabases.set(DatabaseCategory.ORGANISM, [
  Database.ArachnoServer,
  Database.CGD,
  Database.ConoServer,
  Database.CTD,
  Database.dictyBase,
  Database.EchoBASE,
  Database.EcoGene,
  Database.euHCVdb,
  Database.EuPathDB,
  Database.FlyBase,
  Database.GeneReviews,
  Database.Gramene,
  Database.H_InvDB,
  Database.HGNC,
  Database.HPA,
  Database.LegioList,
  Database.Leproma,
  Database.MaizeGDB,
  Database.MIM,
  Database.MGI,
  Database.neXtProt,
  Database.Orphanet,
  Database.PharmGKB,
  Database.PomBase,
  Database.PseudoCAP,
  Database.RGD,
  Database.SGD,
  Database.TAIR,
  Database.TubercuList,
  Database.WormBase,
  Database.Xenbase,
  Database.ZFIN,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PHYLOGENOMIC, [
  Database.eggNOG,
  Database.GeneTree,
  Database.HOGENOM,
  Database.HOVERGEN,
  Database.InParanoid,
  Database.KO,
  Database.OMA,
  Database.OrthoDB,
  Database.PhylomeDB,
  Database.TreeFam,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PATHWAY, [
  Database.BioCyc,
  Database.BRENDA,
  Database.Reactome,
  Database.SABIO_RK,
  Database.SignaLink,
  Database.UniPathway,
]);
databaseCategoryToDatabases.set(DatabaseCategory.EXPRESSION, [
  Database.Bgee,
  Database.ExpressionAtlas,
]);
databaseCategoryToDatabases.set(DatabaseCategory.DOMAIN, [
  Database.HAMAP,
  Database.InterPro,
  Database.Gene3D,
  Database.PANTHER,
  Database.Pfam,
  Database.PIRSF,
  Database.PRINTS,
  Database.ProDom,
  Database.SMART,
  Database.SUPFAM,
  Database.TIGRFAMs,
  Database.PROSITE,
]);
databaseCategoryToDatabases.set(DatabaseCategory.OTHER, [
  // Not found: NextBio
  Database.ChiTaRS,
  Database.EvolutionaryTrace,
  Database.GenomeRNAi,
  Database.GeneWiki,
  Database.PMAP_CutDB,
  Database.PRO,
]);

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

// Combine multiple maps into single map for quick read access.
export const entrySectionDatabaseToDatabaseCategory = new Map<
  string,
  DatabaseCategory
>();
for (const [
  entrySection,
  databaseCategories,
] of entrySectionToDatabaseCategories) {
  if (databaseCategories) {
    for (const databaseCategory of databaseCategories) {
      const databases = databaseCategoryToDatabases.get(databaseCategory);
      if (databases) {
        for (const database of databases) {
          entrySectionDatabaseToDatabaseCategory.set(
            `${entrySection}_${database}`,
            databaseCategory
          );
        }
      }
    }
  }
}

export default entrySectionDatabaseToDatabaseCategory;
