import { Databases, DatabaseCategory } from '../model/types/DatabaseTypes';
import EntrySectionType from '../model/types/EntrySectionType';

export const databaseCategoryToDatabases = new Map<
  DatabaseCategory,
  Databases[]
>();
databaseCategoryToDatabases.set(DatabaseCategory.SEQUENCE, [
  // Not found: EMBL/GenBank/DDBJ
  Databases.EMBL,
  Databases.CCDS,
  Databases.PIR,
  Databases.RefSeq,
  Databases.UniGene,
]);
databaseCategoryToDatabases.set(DatabaseCategory.STRUCTURE, [
  Databases.PDB,
  Databases.SMR,
  Databases.DisProt,
  Databases.ProteinModelPortal,
]);
databaseCategoryToDatabases.set(DatabaseCategory.INTERACTION, [
  Databases.BioGrid,
  Databases.DIP,
  Databases.IntAct,
  Databases.MINT,
  Databases.STRING,
]);
databaseCategoryToDatabases.set(DatabaseCategory.CHEMISTRY, [
  Databases.BindingDB,
  Databases.ChEMBL,
  Databases.DrugBank,
  Databases.GuidetoPHARMACOLOGY,
]);
databaseCategoryToDatabases.set(DatabaseCategory.FAMILY, [
  // Not found: Database.PptaseDB,
  Databases.Allergome,
  Databases.CAZy,
  Databases.MEROPS,
  Databases.MoonProt,
  Databases.mycoCLAP,
  Databases.PeroxiBase,
  Databases.REBASE,
  Databases.TCDB,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PTM, [
  // Not found: DEPOD, PhosphoSite, PhosSite
  Databases.DEPOD,
  Databases.PhosphoSitePlus,
  Databases.UniCarbKB,
]);
databaseCategoryToDatabases.set(DatabaseCategory.POLYMORPHISM, [
  Databases.dbSNP,
  Databases.DMDM,
]);
databaseCategoryToDatabases.set(DatabaseCategory.GEL, [
  Databases.SWISS_2DPAGE,
  Databases.COMPLUYEAST_2DPAGE,
  Databases.DOSAC_COBS_2DPAGE,
  Databases.OGP,
  Databases.REPRODUCTION_2DPAGE,
  Databases.UCD_2DPAGE,
  Databases.World_2DPAGE,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PROTEOMIC, [
  Databases.MaxQB,
  Databases.PaxDb,
  Databases.PeptideAtlas,
  Databases.PRIDE,
  Databases.ProMEX,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PROTOCOL, [Databases.DNASU]);
databaseCategoryToDatabases.set(DatabaseCategory.GENOME, [
  Databases.Ensembl,
  Databases.EnsemblBacteria,
  Databases.EnsemblFungi,
  Databases.EnsemblMetazoa,
  Databases.EnsemblPlants,
  Databases.EnsemblProtists,
  Databases.GeneCards,
  Databases.GeneID,
  Databases.KEGG,
  Databases.PATRIC,
  Databases.UCSC,
  Databases.VectorBase,
]);
databaseCategoryToDatabases.set(DatabaseCategory.ORGANISM, [
  Databases.ArachnoServer,
  Databases.CGD,
  Databases.ConoServer,
  Databases.CTD,
  Databases.dictyBase,
  Databases.EchoBASE,
  Databases.EcoGene,
  Databases.euHCVdb,
  Databases.EuPathDB,
  Databases.FlyBase,
  Databases.GeneReviews,
  Databases.Gramene,
  Databases.H_InvDB,
  Databases.HGNC,
  Databases.HPA,
  Databases.LegioList,
  Databases.Leproma,
  Databases.MaizeGDB,
  Databases.MIM,
  Databases.MGI,
  Databases.neXtProt,
  Databases.Orphanet,
  Databases.PharmGKB,
  Databases.PomBase,
  Databases.PseudoCAP,
  Databases.RGD,
  Databases.SGD,
  Databases.TAIR,
  Databases.TubercuList,
  Databases.WormBase,
  Databases.Xenbase,
  Databases.ZFIN,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PHYLOGENOMIC, [
  Databases.eggNOG,
  Databases.GeneTree,
  Databases.HOGENOM,
  Databases.HOVERGEN,
  Databases.InParanoid,
  Databases.KO,
  Databases.OMA,
  Databases.OrthoDB,
  Databases.PhylomeDB,
  Databases.TreeFam,
]);
databaseCategoryToDatabases.set(DatabaseCategory.PATHWAY, [
  Databases.BioCyc,
  Databases.BRENDA,
  Databases.Reactome,
  Databases.SABIO_RK,
  Databases.SignaLink,
  Databases.UniPathway,
]);
databaseCategoryToDatabases.set(DatabaseCategory.EXPRESSION, [
  Databases.Bgee,
  Databases.ExpressionAtlas,
]);
databaseCategoryToDatabases.set(DatabaseCategory.DOMAIN, [
  Databases.HAMAP,
  Databases.InterPro,
  Databases.Gene3D,
  Databases.PANTHER,
  Databases.Pfam,
  Databases.PIRSF,
  Databases.PRINTS,
  Databases.ProDom,
  Databases.SMART,
  Databases.SUPFAM,
  Databases.TIGRFAMs,
  Databases.PROSITE,
]);
databaseCategoryToDatabases.set(DatabaseCategory.OTHER, [
  // Not found: NextBio
  Databases.ChiTaRS,
  Databases.EvolutionaryTrace,
  Databases.GenomeRNAi,
  Databases.GeneWiki,
  Databases.PMAP_CutDB,
  Databases.PRO,
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
