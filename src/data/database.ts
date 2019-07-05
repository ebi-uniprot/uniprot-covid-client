import EntrySection from '../model/types/EntrySection';
import {
  DatabaseCategory,
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../model/types/DatabaseTypes';
import databaseInfoJson from './databaseInfo.json';
import { flattenArrays } from '../utils/utils';

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

export const databaseCategoryToDatabaseNames = new Map<
  DatabaseCategory,
  string[]
>();
export const databaseNameToCategory = new Map<string, DatabaseCategory>();
export const databaseToDatabaseInfo: {
  [database: string]: DatabaseInfoPoint;
} = {};
databaseInfo.forEach(info => {
  const { name } = info;
  const category = info.category as DatabaseCategory;
  const databaseNames = databaseCategoryToDatabaseNames.get(category);
  databaseCategoryToDatabaseNames.set(
    category,
    databaseNames ? [...databaseNames, name] : [name]
  );
  databaseNameToCategory.set(name, category);
  databaseToDatabaseInfo[name] = info;
});

const selectDatabases = ({
  categories = [],
  whitelist = [],
  blacklist = [],
}: {
  categories?: string[];
  whitelist?: string[];
  blacklist?: string[];
}) =>
  [
    ...flattenArrays(
      categories.map(
        category =>
          databaseCategoryToDatabaseNames.get(category as DatabaseCategory) ||
          []
      )
    ),
    ...whitelist,
  ].filter(db => !blacklist.includes(db));

export const entrySectionToDatabaseNames = new Map<EntrySection, string[]>();
entrySectionToDatabaseNames.set(
  EntrySection.Expression,
  selectDatabases({
    categories: [DatabaseCategory.EXPRESSION],
    whitelist: ['HPA'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.FamilyAndDomains,
  selectDatabases({
    categories: [DatabaseCategory.PHYLOGENOMIC, DatabaseCategory.DOMAIN],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Function,
  selectDatabases({
    categories: [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY],
    whitelist: ['SwissLipids'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Interaction,
  selectDatabases({
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
  selectDatabases({
    categories: [
      DatabaseCategory.PROTEOMIC,
      DatabaseCategory.GEL,
      DatabaseCategory.PTM,
    ],
    whitelist: ['PMAP_CutDB'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Sequence,
  selectDatabases({
    categories: [DatabaseCategory.SEQUENCE, DatabaseCategory.GENOME],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Structure,
  selectDatabases({
    categories: [DatabaseCategory.STRUCTURE],
    whitelist: ['EvolutionaryTrace'],
    blacklist: ['PDB', 'PDBsum'],
  })
);

export const entrySectionToDatabaseCategoryOrder = new Map<
  EntrySection,
  (string)[]
>();
for (const [entrySection, databaseNames] of entrySectionToDatabaseNames) {
  const uniqueCategories: DatabaseCategory[] = [];
  for (const databaseName of databaseNames) {
    const databaseCategory = databaseNameToCategory.get(databaseName);
    if (!databaseCategory || uniqueCategories.includes(databaseCategory)) {
      continue;
    }
    uniqueCategories.push(databaseCategory);
  }
  entrySectionToDatabaseCategoryOrder.set(entrySection, uniqueCategories);
}
