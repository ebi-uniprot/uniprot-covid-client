import {
  databaseNameToCategory,
  entrySectionToDatabaseNames,
  entrySectionToDatabaseCategoryOrder,
  implicitDatabaseXRefs,
  implicitDatabaseDRPresence,
  implicitDatabaseDRAbsence,
  implicitDatabaseAlwaysInclude,
  implicitDatabaseGenePatternOrganism,
  implicitDatabaseSimilarityComment,
} from '../../data/database';
import EntrySection from '../types/EntrySection';
import { DatabaseCategory } from '../types/DatabaseTypes';
import Comment, { Xref, FreeTextComment } from '../types/CommentTypes';
import { GeneNamesData } from '../uniprotkb/sections/NamesAndTaxonomyConverter';
import { flattenGeneNameData } from './utils';
import { Property } from '../types/modelTypes';

export type XrefsGoupedByDatabase = {
  database: string;
  xrefs: Xref[];
};

export type XrefUIModel = {
  category: DatabaseCategory;
  databases: XrefsGoupedByDatabase[];
};

export const getXrefsForSection = (
  xrefs: Xref[],
  section: EntrySection,
  geneNamesData?: GeneNamesData,
  commonName?: string,
  similarityComments?: FreeTextComment[],
  uniProtId?: string
): XrefUIModel[] => {
  const databasesForSection = entrySectionToDatabaseNames.get(section);
  if (!databasesForSection) {
    return [];
  }
  const categoryToNameToXrefs = new Map<
    DatabaseCategory,
    { [name: string]: Xref[] }
  >();
  const implicitDatabasePresenceCheck: { [key: string]: boolean } = {};
  Object.keys(implicitDatabaseDRPresence).forEach(
    xref => (implicitDatabasePresenceCheck[xref] = false)
  );
  const implicitDatabaseAbsenceCheck: { [key: string]: boolean } = {};
  Object.keys(implicitDatabaseDRAbsence).forEach(
    xref => (implicitDatabaseAbsenceCheck[xref] = true)
  );
  const addXrefIfInSection = (xref: Xref) => {
    const { databaseType: name } = xref;
    if (!name) {
      return;
    }
    if (name in implicitDatabasePresenceCheck) {
      implicitDatabasePresenceCheck[name] = true;
    }
    if (name in implicitDatabaseAbsenceCheck) {
      implicitDatabaseAbsenceCheck[name] = false;
    }
    if (!databasesForSection.includes(name)) {
      return;
    }
    const category = databaseNameToCategory.get(name);
    if (!category) {
      return;
    }
    const nameToXrefs = categoryToNameToXrefs.get(category) || {};
    if (!nameToXrefs[name]) {
      nameToXrefs[name] = [];
    }
    nameToXrefs[name].push(xref);
    categoryToNameToXrefs.set(category, nameToXrefs);
  };
  xrefs.forEach(addXrefIfInSection);
  // After passing through all of the xrefs we can now establish
  // which DR line contingent-implicit databases can be included
  [
    [implicitDatabasePresenceCheck, implicitDatabaseDRPresence],
    [implicitDatabaseAbsenceCheck, implicitDatabaseDRAbsence],
  ].forEach(([check, ruleMap]) => {
    Object.entries(check).forEach(([name, include]) => {
      if (!include) {
        return;
      }
      const implicitNames = ruleMap[name];
      if (implicitNames) {
        implicitNames.forEach(implicitName => {
          const xref = implicitDatabaseXRefs.get(implicitName);
          if (xref) {
            addXrefIfInSection(xref);
          }
        });
      }
    });
  });
  // The implicit database GPCRDB should only be inluded if there exists a
  // similarity comment with "Belongs to the G-protein coupled receptor"
  if (similarityComments) {
    Object.entries(implicitDatabaseSimilarityComment).forEach(
      ([implicitName, commentSubstring]) => {
        const foundCommentSubstring = similarityComments.some(
          ({ texts }) =>
            texts && texts.some(({ value }) => value.includes(commentSubstring))
        );
        if (foundCommentSubstring) {
          const xref = implicitDatabaseXRefs.get(implicitName);
          if (xref) {
            addXrefIfInSection({
              ...xref,
              properties: [
                { key: 'uniProtId' as PropertyKey, value: uniProtId },
              ],
            });
          }
        }
      }
    );
  }
  // Always include these implicit databases (ie they are unconditional)
  implicitDatabaseAlwaysInclude.forEach(name => {
    const xref = implicitDatabaseXRefs.get(name);
    if (xref) {
      addXrefIfInSection(xref);
    }
  });

  const { pattern, organism } = implicitDatabaseGenePatternOrganism;
  if (
    geneNamesData &&
    commonName &&
    Object.keys(organism).includes(commonName)
  ) {
    const geneNames = flattenGeneNameData(geneNamesData);
    geneNames
      .filter(geneName => geneName.match(pattern))
      .forEach(gene => {
        if (commonName in organism) {
          const name = organism[commonName as keyof typeof organism];
          const xref = implicitDatabaseXRefs.get(name);
          if (xref) {
            addXrefIfInSection({
              ...xref,
              properties: [{ key: 'gene' as PropertyKey, value: gene }],
            });
          }
        }
      });
  }
  const databaseCategoryOrder = entrySectionToDatabaseCategoryOrder.get(
    section
  ) as DatabaseCategory[];
  if (!databaseCategoryOrder) {
    return [];
  }
  const xrefCategories: XrefUIModel[] = [];
  databaseCategoryOrder.forEach(category => {
    const nameToXrefs = categoryToNameToXrefs.get(category);
    if (!nameToXrefs) {
      return;
    }
    xrefCategories.push({
      category,
      databases: Object.entries(nameToXrefs).map(([database, xrefs]) => ({
        database,
        xrefs,
      })),
    });
  });

  return xrefCategories;
};
