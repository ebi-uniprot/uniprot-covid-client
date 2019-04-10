import DatabaseCategory from './DatabaseCategory';
import Database from './Database';

const databaseCategoryToDatabases = new Map<DatabaseCategory, Database[]>();

// Not found: EMBL/GenBank/DDBJ
databaseCategoryToDatabases.set(DatabaseCategory.SEQUENCE, [
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

// Not found: Database.PptaseDB,
databaseCategoryToDatabases.set(DatabaseCategory.FAMILY, [
  Database.Allergome,
  Database.CAZy,
  Database.MEROPS,
  Database.MoonProt,
  Database.mycoCLAP,
  Database.PeroxiBase,
  Database.REBASE,
  Database.TCDB,
]);

// Not found: DEPOD, PhosphoSite, PhosSite
databaseCategoryToDatabases.set(DatabaseCategory.PTM, [
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

// Not found: NextBio
databaseCategoryToDatabases.set(DatabaseCategory.OTHER, [
  Database.ChiTaRS,
  Database.EvolutionaryTrace,
  Database.GenomeRNAi,
  Database.GeneWiki,
  Database.PMAP_CutDB,
  Database.PRO,
]);

export default databaseCategoryToDatabases;
