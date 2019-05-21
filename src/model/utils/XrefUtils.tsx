import {
  databaseCategoryToDatabases,
  entrySectionToDatabaseCategories,
} from '../../data/database';
import EntrySectionType from '../types/EntrySectionType';
import Database, { DatabaseCategory } from '../types/DatabaseTypes';
import { Property } from '../types/modelTypes';

export type DatabaseCrossReference = {
  databaseType?: Database;
  id?: string;
  properties?: [Property];
  isoformId?: string;
};

export type DatabaseXrefs = {
  database: Database;
  xrefs: DatabaseCrossReference[];
};

export type XrefCategory = {
  category: DatabaseCategory;
  databases: DatabaseXrefs[];
};

export type XrefItem = {
  databaseCategory: string;
  xref: DatabaseCrossReference;
};

export const getXrefsForSection = (
  xrefs: DatabaseCrossReference[],
  section: EntrySectionType
) => {
  const xrefCategories: XrefCategory[] = [];
  // Get the categories relevant to the given entry section
  const sectionCategories = entrySectionToDatabaseCategories.get(section);
  if (!sectionCategories) {
    return null;
  }
  sectionCategories.forEach(category => {
    // Get the database relevant to the given category
    const databases = databaseCategoryToDatabases.get(category);
    const categoryDatabases: DatabaseXrefs[] = [];
    if (databases) {
      databases.forEach(database => {
        // Filter the xref data to only return the ones for
        // the given database
        const databaseXrefs = xrefs.filter(
          xref => xref.databaseType === database
        );
        // If we have hits, add them too the array
        if (databaseXrefs && databaseXrefs.length > 0) {
          categoryDatabases.push({
            database: database,
            xrefs: databaseXrefs,
          });
        }
      });
    }
    // If we have hits, add them too the array
    if (categoryDatabases.length > 0) {
      xrefCategories.push({
        category: category,
        databases: categoryDatabases,
      });
    }
  });
  return xrefCategories;
};
