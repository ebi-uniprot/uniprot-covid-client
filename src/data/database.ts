import { Database, DatabaseCategory } from '../model/types/DatabaseTypes';
import EntrySection from '../model/types/EntrySection';
import { DatabaseInfo } from '../model/types/DatabaseTypes';
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

export const databaseCategoryToDatabaseNames = new Map<string, string[]>();
export const databaseNameToCategory = new Map<string, string>();
databaseInfo.forEach(info => {
  const { name, category } = info;
  const databaseNames = databaseCategoryToDatabaseNames.get(category);
  databaseCategoryToDatabaseNames.set(
    category,
    databaseNames ? [...databaseNames, name] : [name]
  );
  databaseNameToCategory.set(name, category);
});

const getDatabases = ({ categories = [], whitelist = [], blacklist = [] }) =>
  [
    ...flattenArrays(
      categories.map(category => databaseCategoryToDatabaseNames.get(category))
    ),
    ...whitelist,
  ].filter(db => !blacklist.includes(db));

export const entrySectionToDatabaseNames = new Map<EntrySection, string[]>();
entrySectionToDatabaseNames.set(
  EntrySection.Expression,
  getDatabases({
    categories: [DatabaseCategory.EXPRESSION],
    whitelist: [Database.HPA],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.FamilyAndDomains,
  getDatabases({
    categories: [
      DatabaseCategory.FAMILY,
      DatabaseCategory.PHYLOGENOMIC,
      DatabaseCategory.DOMAIN,
    ],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Function,
  getDatabases({
    categories: [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY],
    whitelist: [Database.SwissLipids],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Interaction,
  getDatabases({
    categories: [DatabaseCategory.INTERACTION],
    whitelist: [Database.BindingDB],
  })
);
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
  Database.DisGeNET,
  Database.GeneReviews,
  Database.MalaCards,
  Database.MIM,
  Database.OpenTargets,
  Database.Orphanet,
  Database.PharmGKB,
  Database.ChEMBL,
  Database.DrugBank,
  Database.GuidetoPHARMACOLOGY,
  Database.BioMuta,
  Database.DMDM,
  Database.Allergome,
]);
entrySectionToDatabaseNames.set(
  EntrySection.ProteinProcessing,
  getDatabases({
    categories: [
      DatabaseCategory.PROTEOMIC,
      DatabaseCategory.GEL,
      DatabaseCategory.PTM,
    ],
    whitelist: [Database.PMAP_CutDB],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Sequence,
  getDatabases({
    categories: [DatabaseCategory.SEQUENCE, DatabaseCategory.GENOME],
  })
);

entrySectionToDatabaseNames.set(
  EntrySection.Structure,
  getDatabases({
    categories: [DatabaseCategory.STRUCTURE],
    whitelist: [Database.EvolutionaryTrace],
    blacklist: [Database.PDB, Database.PDBsum],
  })
);

export const entrySectionToDatabaseCategoryOrder = new Map<
  EntrySection,
  (string | undefined)[]
>();

for (const [entrySection, databaseNames] of entrySectionToDatabaseNames) {
  entrySectionToDatabaseCategoryOrder.set(entrySection, [
    ...new Set(
      databaseNames.map(databaseName =>
        databaseNameToCategory.get(databaseName)
      )
    ),
  ]);
}
