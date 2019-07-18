import EntrySection from '../model/types/EntrySection';
import { DatabaseCategory, DatabaseInfo } from '../model/types/DatabaseTypes';
import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../utils/database';
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

export const {
  databaseCategoryToNames,
  databaseNameToCategory,
  databaseToDatabaseInfo,
} = getDatabaseInfoMaps(databaseInfo);

const databaseSelector = selectDatabases(databaseCategoryToNames);

export const entrySectionToDatabaseNames = new Map<EntrySection, string[]>();
entrySectionToDatabaseNames.set(
  EntrySection.Expression,
  databaseSelector({
    categories: [DatabaseCategory.EXPRESSION],
    whitelist: ['HPA'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.FamilyAndDomains,
  databaseSelector({
    categories: [DatabaseCategory.PHYLOGENOMIC, DatabaseCategory.DOMAIN],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Function,
  databaseSelector({
    categories: [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY],
    whitelist: ['SwissLipids'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Interaction,
  databaseSelector({
    categories: [DatabaseCategory.INTERACTION],
    whitelist: ['BindingDB'],
  })
);
entrySectionToDatabaseNames.set(EntrySection.NamesAndTaxonomy, [
  'ArachnoServer',
  'Araport',
  'CGD',
  'ConoServer',
  'dictyBase',
  'EcoGene',
  'EuPathDB',
  'FlyBase',
  'Gramene',
  'HGNC',
  'LegioList',
  'Leproma',
  'MaizeGDB',
  'MGI',
  'MIM',
  'neXtProt',
  'PomBase',
  'PseudoCAP',
  'RGD',
  'SGD',
  'TAIR',
  'TubercuList',
  'VGNC',
  'WormBase',
  'Xenbase',
  'ZFIN',
]);
entrySectionToDatabaseNames.set(EntrySection.PathologyAndBioTech, [
  'DisGeNET',
  'GeneReviews',
  'MalaCards',
  'MIM',
  'OpenTargets',
  'Orphanet',
  'PharmGKB',
  'ChEMBL',
  'DrugBank',
  'GuidetoPHARMACOLOGY',
  'BioMuta',
  'DMDM',
  'Allergome',
]);
entrySectionToDatabaseNames.set(
  EntrySection.ProteinProcessing,
  databaseSelector({
    categories: [
      DatabaseCategory.PROTEOMIC,
      DatabaseCategory.GEL,
      DatabaseCategory.PTM,
    ],
    whitelist: ['PMAP-CutDB'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Sequence,
  databaseSelector({
    categories: [DatabaseCategory.SEQUENCE, DatabaseCategory.GENOME],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Structure,
  databaseSelector({
    categories: [DatabaseCategory.STRUCTURE],
    whitelist: ['EvolutionaryTrace'],
    blacklist: ['PDB', 'PDBsum'],
  })
);

export const entrySectionToDatabaseCategoryOrder = getEntrySectionToDatabaseCategoryOrder(
  entrySectionToDatabaseNames,
  databaseNameToCategory
);
