import {
  DatabaseCrossReference,
  XrefCategory,
  DatabaseXrefs,
} from '../../view/uniprotkb/components/XRefView';
import {
  databaseCategoryToDatabases,
  entrySectionToDatabaseCategories,
} from '../../data/database';
import EntrySectionType from '../types/EntrySectionType';

export const getCategoryXrefs = (
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

  // return sectionCategories
  //   .map(category => {
  //     // Get the database relevant to the given category
  //     const databases = databaseCategoryToDatabases.get(category);
  //     if (databases) {
  //       return {
  //         category: category,
  //         databases: databases
  //           .map(database => {
  //             // Filter the xref data to only return the ones for
  //             // the given database
  //             return {
  //               database: database,
  //               xrefs: xrefs.filter(xref => xref.databaseType === database),
  //             };
  //           })
  //           .filter(database => typeof database !== 'undefined'),
  //       };
  //     }
  //   };
};
