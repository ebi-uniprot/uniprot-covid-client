import EntrySection from '../model/types/EntrySection';
import {
  DatabaseCategory,
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../model/types/DatabaseTypes';
import { flattenArrays } from '../utils/utils';

export const getDatabaseInfoMaps = (databaseInfo: DatabaseInfo) => {
  const databaseCategoryToNames = new Map<DatabaseCategory, string[]>();
  const databaseNameToCategory = new Map<string, DatabaseCategory>();
  const databaseToDatabaseInfo: {
    [database: string]: DatabaseInfoPoint;
  } = {};
  databaseInfo.forEach(info => {
    const { name } = info;
    const category = info.category as DatabaseCategory;
    const databaseNames = databaseCategoryToNames.get(category);
    databaseCategoryToNames.set(
      category,
      databaseNames ? [...databaseNames, name] : [name]
    );
    databaseNameToCategory.set(name, category);
    databaseToDatabaseInfo[name] = info;
  });
  return {
    databaseCategoryToNames,
    databaseNameToCategory,
    databaseToDatabaseInfo,
  };
};

export const selectDatabases = (
  databaseCategoryToNames: Map<DatabaseCategory, string[]>
) => ({
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
          databaseCategoryToNames.get(category as DatabaseCategory) || []
      )
    ),
    ...whitelist,
  ].filter(db => !blacklist.includes(db));

export const getEntrySectionToDatabaseCategoryOrder = (
  entrySectionToDatabaseNames: Map<EntrySection, string[]>,
  databaseNameToCategory: Map<string, DatabaseCategory>
) => {
  const entrySectionToDatabaseCategoryOrder = new Map<
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
  return entrySectionToDatabaseCategoryOrder;
};
