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
  implicitDatabasesEC,
} from '../../data/database';
import EntrySection from '../types/EntrySection';
import { DatabaseCategory } from '../types/DatabaseTypes';
import { Xref, FreeTextComment } from '../types/CommentTypes';
import { GeneNamesData } from '../uniprotkb/sections/NamesAndTaxonomyConverter';
import { flattenGeneNameData } from './utils';
import { Property, PropertyKey, ValueWithEvidence } from '../types/modelTypes';
import { uniq } from '../../utils/utils';

export type XrefsGoupedByDatabase = {
  database: string;
  xrefs: Xref[];
};

export type XrefUIModel = {
  category: DatabaseCategory;
  databases: XrefsGoupedByDatabase[];
};

export const getDRImplicitXrefs = (xrefs: Xref[], geneNames: string[]) => {
  // Get DR line contingent-implicit xrefs
  const implicitDatabaseDRPresenceCheck: { [key: string]: boolean } = {};
  Object.keys(implicitDatabaseDRPresence).forEach(xref => {
    implicitDatabaseDRPresenceCheck[xref] = false;
  });
  const implicitDatabaseDRAbsenceCheck: { [key: string]: boolean } = {};
  Object.keys(implicitDatabaseDRAbsence).forEach(xref => {
    implicitDatabaseDRAbsenceCheck[xref] = true;
  });
  xrefs.forEach(xref => {
    const { databaseType: name } = xref;
    if (!name) {
      return;
    }
    if (name in implicitDatabaseDRPresenceCheck) {
      implicitDatabaseDRPresenceCheck[name] = true;
    }
    if (name in implicitDatabaseDRAbsenceCheck) {
      implicitDatabaseDRAbsenceCheck[name] = false;
    }
  });
  const foundXrefs: Xref[] = [];
  [
    [implicitDatabaseDRPresenceCheck, implicitDatabaseDRPresence],
    [implicitDatabaseDRAbsenceCheck, implicitDatabaseDRAbsence],
  ].forEach(([check, ruleMap]) => {
    Object.entries(check).forEach(([name, include]) => {
      if (!include || !(name in ruleMap)) {
        return;
      }
      const implicitNames = ruleMap[name] as string[];
      if (implicitNames) {
        implicitNames.forEach(implicitName => {
          const xref = implicitDatabaseXRefs.get(implicitName);
          if (xref) {
            let property: Property = {};
            if (geneNames.length) {
              property = {
                key: 'GeneName' as PropertyKey,
                value: geneNames[0],
              };
            }
            foundXrefs.push({
              ...xref,
              properties: [property],
            });
          }
        });
      }
    });
  });
  return foundXrefs;
};

export const getDatabaseSimilarityCommentImplicitXrefs = (
  uniProtId: string | undefined,
  similarityComments?: FreeTextComment[]
) => {
  // The implicit database GPCRDB should only be inluded if there exists a
  // similarity comment with "Belongs to the G-protein coupled receptor"
  const foundXrefs: Xref[] = [];
  if (similarityComments && uniProtId) {
    Object.entries(implicitDatabaseSimilarityComment).forEach(
      ([implicitName, commentSubstring]) => {
        const foundCommentSubstring = similarityComments.some(
          ({ texts }) =>
            texts && texts.some(({ value }) => value.includes(commentSubstring))
        );
        if (foundCommentSubstring) {
          const xref = implicitDatabaseXRefs.get(implicitName);
          if (xref) {
            const property: Property = {
              key: 'uniProtId' as PropertyKey,
              value: uniProtId,
            };
            foundXrefs.push({
              ...xref,
              properties: [property],
            });
          }
        }
      }
    );
  }
  return foundXrefs;
};

export const getGenePatternOrganismImplicitXrefs = (
  geneNames: string[],
  commonName?: string | null
) => {
  // Implicit databases which require depend on the a gene name pattern
  // and orgnasim pattern
  const foundXrefs: Xref[] = [];
  const { pattern, organism } = implicitDatabaseGenePatternOrganism;
  if (commonName && Object.keys(organism).includes(commonName)) {
    geneNames
      .filter((geneName: { match: (arg0: RegExp) => void }) =>
        geneName.match(pattern)
      )
      .forEach((gene: string) => {
        if (commonName in organism) {
          const name = organism[commonName as keyof typeof organism];
          const xref = implicitDatabaseXRefs.get(name);
          if (xref) {
            const property: Property = {
              key: 'gene' as PropertyKey,
              value: gene,
            };
            foundXrefs.push({
              ...xref,
              properties: [property],
            });
          }
        }
      });
  }
  return foundXrefs;
};

export const getECImplicitXrefs = (ecNumbers?: ValueWithEvidence[] | null) => {
  // EC dependent implicit databases
  const foundXrefs: Xref[] = [];
  if (ecNumbers) {
    implicitDatabasesEC.forEach(name => {
      const xref = implicitDatabaseXRefs.get(name);
      if (xref) {
        ecNumbers.forEach(({ value }) => {
          const property: Property = {
            key: 'ec' as PropertyKey,
            value,
          };
          foundXrefs.push({
            ...xref,
            properties: [property],
          });
        });
      }
    });
  }
  return foundXrefs;
};

export const getUnconditionalImplicitXrefs = () => {
  // Always include these implicit databases (ie they are unconditional)
  const foundXrefs: Xref[] = [];
  implicitDatabaseAlwaysInclude.forEach(name => {
    const xref = implicitDatabaseXRefs.get(name);
    if (xref) {
      foundXrefs.push(xref);
    }
  });
  return foundXrefs;
};

export const getXrefsForSection = (
  xrefs: Xref[],
  section: EntrySection,
  geneNamesData?: GeneNamesData,
  commonName?: string | null,
  similarityComments?: FreeTextComment[],
  uniProtId?: string,
  ecNumbers?: ValueWithEvidence[] | null
): XrefUIModel[] => {
  const databasesForSection = entrySectionToDatabaseNames.get(section);
  if (!databasesForSection) {
    return [];
  }
  const categoryToNameToXrefs = new Map<
    DatabaseCategory,
    { [name: string]: Xref[] }
  >();
  const geneNames = geneNamesData ? flattenGeneNameData(geneNamesData) : [];
  // Combine all of the 'explicit' xrefs with all of the implicit xrefs
  // which pass the conditions and add if they are part of the section
  uniq([
    ...xrefs,
    ...getUnconditionalImplicitXrefs(),
    ...getDRImplicitXrefs(xrefs, geneNames),
    ...getDatabaseSimilarityCommentImplicitXrefs(uniProtId, similarityComments),
    ...getGenePatternOrganismImplicitXrefs(geneNames, commonName),
    ...getECImplicitXrefs(ecNumbers),
  ]).forEach(xref => {
    const { databaseType: name } = xref;
    if (!name) {
      return;
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
  });

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
      databases: Object.entries(nameToXrefs).map(([database, refs]) => ({
        database,
        xrefs: refs,
      })),
    });
  });

  return xrefCategories;
};
