import { Database, DatabaseCategory } from '../model/types/DatabaseTypes';
import EntrySectionType from '../model/types/EntrySectionType';

export const databaseCategoryToDatabases = new Map<
  DatabaseCategory,
  Database[]
>();
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

export const entrySectionToDatabaseCategories = new Map<
  EntrySectionType,
  DatabaseCategory[]
>();
entrySectionToDatabaseCategories.set(EntrySectionType.Expression, [
  DatabaseCategory.ORGANISM,
  DatabaseCategory.EXPRESSION,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.FamilyAndDomains, [
  DatabaseCategory.FAMILY,
  DatabaseCategory.PHYLOGENOMIC,
  DatabaseCategory.DOMAIN,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.Function, [
  DatabaseCategory.PATHWAY,
  DatabaseCategory.FAMILY,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.Interaction, [
  DatabaseCategory.INTERACTION,
  DatabaseCategory.CHEMISTRY,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.NamesAndTaxonomy, [
  DatabaseCategory.ORGANISM,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.PathologyAndBioTech, [
  DatabaseCategory.ORGANISM,
  DatabaseCategory.OTHER,
  DatabaseCategory.FAMILY,
  DatabaseCategory.CHEMISTRY,
  DatabaseCategory.POLYMORPHISM,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.ProteinProcessing, [
  DatabaseCategory.PROTEOMIC,
  DatabaseCategory.GEL,
  DatabaseCategory.PTM,
  DatabaseCategory.OTHER,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.Sequence, [
  DatabaseCategory.SEQUENCE,
  DatabaseCategory.GENOME,
  DatabaseCategory.POLYMORPHISM,
]);
entrySectionToDatabaseCategories.set(EntrySectionType.Structure, [
  DatabaseCategory.STRUCTURE,
  DatabaseCategory.PROTOCOL,
  DatabaseCategory.OTHER,
]);
