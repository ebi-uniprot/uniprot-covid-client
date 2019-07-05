import {
  databaseNameToCategory,
  entrySectionToDatabaseNames,
  entrySectionToDatabaseCategoryOrder,
} from '../../data/database';
import EntrySection from '../types/EntrySection';
import { Database, DatabaseCategory } from '../types/DatabaseTypes';
import { Property } from '../types/modelTypes';

export type Xref = {
  databaseType?: Database;
  id?: string;
  properties?: [Property];
  isoformId?: string;
};

export type XrefsGoupedByDatabase = {
  database: Database;
  xrefs: Xref[];
};

export type XrefUIModel = {
  category: DatabaseCategory;
  databases: XrefsGoupedByDatabase[];
};

export const getXrefsForSection = (
  xrefs: Xref[],
  section: EntrySection
): XrefUIModel[] => {
  const databasesForSection = entrySectionToDatabaseNames.get(section);
  if (!databasesForSection) {
    return [];
  }
  const categoryToNameToXrefs = {};
  xrefs.forEach(xref => {
    const { databaseType: name } = xref;
    if (!name || !databasesForSection.includes(name)) {
      return [];
    }
    const category = databaseNameToCategory.get(name);
    if (!category) {
      return [];
    }
    if (!categoryToNameToXrefs[category]) {
      categoryToNameToXrefs[category] = {};
    }
    if (!categoryToNameToXrefs[category][name]) {
      categoryToNameToXrefs[category][name] = [];
    }
    categoryToNameToXrefs[category][name].push(xref);
  });
  console.log(JSON.stringify(categoryToNameToXrefs, null, 2));
  const databaseCategoryOrder = entrySectionToDatabaseCategoryOrder.get(
    section
  );
  const xrefCategories: XrefUIModel[] = [];
  databaseCategoryOrder.forEach(category => {
    const nameToXrefs = categoryToNameToXrefs[category];
    if (!nameToXrefs) {
      return [];
    }
    xrefCategories.push({
      category: category as DatabaseCategory,
      databases: Object.keys(nameToXrefs).map(name => ({
        database: name,
        xrefs: nameToXrefs[name],
      })),
    });
  });

  return xrefCategories;
};
