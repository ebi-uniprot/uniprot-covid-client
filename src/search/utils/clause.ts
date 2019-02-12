import { v1 } from 'uuid';
import { serializableDeepAreEqual, removeProperty } from '../../utils/utils';
import { Operator, Input, SearchTermType } from '../types/searchTypes';

enum itemType {
  comment = 'comment',
  database = 'database',
  feature = 'feature',
  goterm = 'goterm',
  group = 'group',
  groupDisplay = 'groupDisplay',
  single = 'single',
}

enum dataType {
  empty = '',
  date = 'date',
  enum = 'enum',
  integer = 'integer',
  string = 'string',
}

type Clause = {
  id: string;
  logicOperator: Operator;
  searchTerm: {
    label: string;
    term: string;
    example: string;
    itemType: itemType;
    dataType: dataType;
    id: string;
  };
  queryInput: Input;
};

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
  searchTerm: {
    label: 'Any',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: itemType.single,
    dataType: dataType.string,
    id: 'id_Any',
  },
  queryInput: {},
});

export const clausesAreEqual = (clause1: Clause, clause2: Clause) =>
  serializableDeepAreEqual(
    removeProperty(clause1, 'id'),
    removeProperty(clause2, 'id')
  );

const findSearchTermRecursive = (
  queryField: string,
  searchTerms: SearchTermType[],
  valuePrefix = ''
): SearchTermType | undefined => {
  for (const searchTerm of searchTerms) {
    if (
      valuePrefix &&
      searchTerm.valuePrefix === valuePrefix &&
      searchTerm.term === queryField
    ) {
      return searchTerm;
    }
    if (!valuePrefix && searchTerm.term === queryField) {
      return searchTerm;
    }
    if (searchTerm.items) {
      const found = findSearchTermRecursive(
        queryField,
        searchTerm.items,
        valuePrefix
      );
      if (found) {
        return found;
      }
    }
  }
};

const findSearchTerm = (
  queryField: string,
  searchTerms: SearchTermType[],
  valuePrefix = ''
): SearchTermType | undefined => {
  const searchTerm = findSearchTermRecursive(
    queryField,
    searchTerms,
    valuePrefix
  );
  if (!searchTerm) {
    throw new Error(`${queryField} not a valid field.`);
  }
  return searchTerm;
};

const parseRangeValue = (value: string) => {
  const regeNumberRange = /\[([0-9]+)\s*TO\s*([0-9]+)\]/gi;
  const captureGroupsNumber = regeNumberRange.exec(value);
  if (captureGroupsNumber && captureGroupsNumber[1] && captureGroupsNumber[2]) {
    return {
      rangeFrom: Number(captureGroupsNumber[1]),
      rangeTo: Number(captureGroupsNumber[2]),
    };
  }
  const regexDateRange = /\[([0-9\-]+)\s*TO\s*([0-9\-]+)\]/gi;
  const captureGroupsDate = regexDateRange.exec(value);
  if (captureGroupsDate && captureGroupsDate[1] && captureGroupsDate[2]) {
    return {
      rangeFrom: captureGroupsDate[1],
      rangeTo: captureGroupsDate[2],
    };
  }
  throw new Error(`${value} value is not a valid range`);
};

const parseXrefSubquery = (
  term: string,
  value: string,
  conjunction: keyof typeof Operator,
  searchTerms: SearchTermType[]
) => {
  const clause = {
    id: v1(),
    logicOperator: conjunction,
  };
  const tokens = value.split('-');
  if (tokens.length === 1) {
    // Only a value is provided so this is an xref any search
    return {
      ...clause,
      searchTerm: findSearchTerm('xref', searchTerms, 'any'),
      queryInput: { stringValue: tokens[0] },
    } as Clause;
  }
  if (tokens.length === 2) {
    return {
      ...clause,
      searchTerm: findSearchTerm('xref', searchTerms, tokens[0]),
      queryInput: { stringValue: tokens[1] },
    } as Clause;
  }
  throw new Error(`${value} is not a properly formed xref.`);
};

const parseIdNameSubquery = (
  queryTerm: string,
  value: string,
  conjunction: keyof typeof Operator,
  searchTerms: SearchTermType[]
) => {
  const [termName, searchType] = queryTerm.split('_');
  const searchTerm = findSearchTerm(termName, searchTerms);

  if (searchType === 'id') {
    return {
      id: v1(),
      logicOperator: conjunction,
      searchTerm,
      queryInput: { stringValue: value },
    } as Clause;
  }
  throw new Error(`${queryTerm} not a valid _id or _name style term.`);
};

const parseRangeOrEvidenceSubquery = (subquery: string, value: string) => {
  const regexp = /^(?:ft|cc)(len|ev)?_(.*):.*/i;
  const matches = regexp.exec(subquery);
  if (!matches) {
    return {};
  }
  const rangeOrEvidence = matches[1];
  if (!rangeOrEvidence) {
    return { stringValue: value };
  }
  if (rangeOrEvidence === 'ev') {
    return { evidenceValue: value };
  }
  if (rangeOrEvidence === 'len') {
    return { ...parseRangeValue(value) };
  }
  throw new Error(`${subquery} subquery is not valid.`);
};

const parseSinglePartSubquery = (
  conjunctionString: string = 'AND',
  termValue: string,
  searchTerms: SearchTermType[]
) => {
  if (!searchTerms) {
    return;
  }
  const conjunctionUpper = conjunctionString.toUpperCase();

  let conjunction: keyof typeof Operator;
  if (conjunctionUpper in Operator) {
    conjunction = conjunctionUpper as keyof typeof Operator;
  } else {
    throw new Error(`${conjunctionString} conjunction is not valid.`);
  }

  const tokens = termValue.split(':');
  const value = tokens[1];
  let term = tokens[0];
  if (!value) {
    const emptyClause = createEmptyClause();
    return { ...emptyClause, queryInput: { stringValue: term } };
  }

  if (term.match(/^xref/i)) {
    return parseXrefSubquery(term, value, conjunction, searchTerms);
  }

  if (term.match(/^organism|taxonomy/i)) {
    return parseIdNameSubquery(term, value, conjunction, searchTerms);
  }

  let queryInput = {};
  if (term.match(/^ft(len|ev)?_/i)) {
    try {
      queryInput = parseRangeOrEvidenceSubquery(termValue, value);
    } catch (e) {
      // console.log(e);
    }
    term = getSinglePartSubqueryTerm(termValue);
  }

  const searchTerm = findSearchTerm(term, searchTerms);
  if (!searchTerm) {
    throw new Error(`${term} not a valid term.`);
  }

  return {
    id: v1(),
    logicOperator: conjunction,
    searchTerm,
    queryInput: {
      ...queryInput,
      ...(searchTerm.hasRange
        ? parseRangeValue(value)
        : { stringValue: value }),
    },
  } as Clause;
};

interface IPrefixMap {
  ft: string;
  cc: string;
  [key: string]: string;
}

const itemTypeToPrefixMap: IPrefixMap = {
  ft: 'feature',
  cc: 'comment',
};

const getSinglePartSubqueryPrefix = (subquery: string) => {
  const prefix = subquery.slice(0, 2);
  return prefix in itemTypeToPrefixMap ? prefix : null;
};

const allStringArrayElementsEqual = (arr: Array<string | null>) => {
  return arr.every(
    (element: string | null, i: number) => !!element && element === arr[0]
  );
};

const getTermFrom = (queryStringGroup: string[]) => {
  const prefixes = queryStringGroup.map((queryString: string) =>
    queryString.slice(0, 2)
  );
  if (prefixes.every((prefix: string, i: number) => prefix === prefixes[0])) {
    return itemTypeToPrefixMap[prefixes[0]];
  } else {
    throw new Error(`${queryStringGroup} has inconsistent item type prefixes.`);
  }
};

const getSinglePartSubqueryTerm = (field: string) => {
  if (field.indexOf('_') < 0) {
    return field;
  }
  const regexp = /^\w*?_(\w+)/g;
  const match = regexp.exec(field);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error(`${field} does not contain a searchtype.`);
};

const getMultiplePartSubqueryTerm = (subqueryParts: string[]) => {
  const terms = subqueryParts.map(subqueryPart =>
    getSinglePartSubqueryTerm(subqueryPart)
  );
  if (allStringArrayElementsEqual(terms)) {
    return terms[0];
  }
};

const getMultiplePartSubqueryPrefix = (subqueryParts: string[]) => {
  const prefixes = subqueryParts.map(subqueryPart =>
    getSinglePartSubqueryPrefix(subqueryPart)
  );
  if (allStringArrayElementsEqual(prefixes)) {
    return prefixes[0];
  }
};

const parseMultiplePartSubquery = (
  conjunction: string,
  subqueryParts: string[],
  searchTerms: SearchTermType[]
) => {
  const term = getMultiplePartSubqueryTerm(subqueryParts);
  if (!term) {
    throw new Error(`${subqueryParts} has inconsistent terms.`);
  }
  const searchTerm = findSearchTerm(term, searchTerms);
  if (!searchTerm) {
    throw new Error(`Cannot find ${term}: in search_terms.`);
  }
  const prefix = getMultiplePartSubqueryPrefix(subqueryParts);
  if (!prefix) {
    throw new Error(`${subqueryParts} has inconsistent prefixes.`);
  }
  let queryInput = {};
  subqueryParts.forEach((subqueryPart: string) => {
    const [field, value] = subqueryPart.split(':');
    queryInput = {
      ...queryInput,
      ...parseRangeOrEvidenceSubquery(subqueryPart, value),
    };
  });

  return {
    id: v1(),
    logicOperator: conjunction,
    searchTerm,
    queryInput,
  };
};

const parseSubquery = (
  conjunction: string,
  subquery: string,
  searchTerms: SearchTermType[]
) => {
  const regexQuery = /\(?([0-9a-z_]+:?[0-9a-z\[\]\s\-_\.]*)\)?(?:\s*(AND|OR|NOT)\s*)*/gi;
  const subqueryParts = [];
  let match;
  do {
    // Need this so we don't assign within a loop: while ((match = regexQuery.exec(subquery)) !== null)
    match = regexQuery.exec(subquery);
    if (match) {
      const fieldValue = match[1];
      subqueryParts.push(fieldValue);
    }
  } while (match);

  switch (subqueryParts.length) {
    case 0:
      throw new Error(`No clauses found in ${subquery}.`);
    case 1:
      return parseSinglePartSubquery(
        conjunction,
        subqueryParts[0],
        searchTerms
      );
    default:
      return parseMultiplePartSubquery(conjunction, subqueryParts, searchTerms);
  }
};

const getTopLevelConjunctionsClauses = (query: string) => {
  let balance = 0;
  const clauses = [];
  const conjunctions = [];
  let start = 0;
  for (let i = 0; i < query.length; i += 1) {
    const character = query[i];
    if (character === '(') {
      balance += 1;
      if (balance === 1) {
        if (i === 0) {
          conjunctions.push('AND');
        } else {
          conjunctions.push(query.slice(start + 1, i).trim());
        }
        start = i;
      }
    } else if (character === ')') {
      balance -= 1;
      if (balance === 0) {
        clauses.push(query.slice(start + 1, i));
        start = i;
      }
    }
  }
  return [conjunctions, clauses];
};

export const parseQueryString = (
  query: string,
  searchTerms: SearchTermType[]
) => {
  if (!query) {
    return [createEmptyClause()];
  }
  const [
    topLevelConjunctions,
    topLevelSubqueries,
  ] = getTopLevelConjunctionsClauses(query);
  const clauses = [];
  for (let i = 0; i < topLevelConjunctions.length; i += 1) {
    const conjuction = topLevelConjunctions[i];
    const clause = topLevelSubqueries[i];
    clauses.push(parseSubquery(conjuction, clause, searchTerms));
  }
  return clauses;
};
