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
  const regexRange = /\[([0-9\-]+)\s*TO\s*([0-9\-]+)\]/gi;
  const captureGroups = regexRange.exec(value);
  if (!captureGroups || (!captureGroups[1] && !captureGroups[2])) {
    throw new Error(`${value} value is not a valid range`);
  }
  return {
    rangeFrom: captureGroups[1],
    rangeTo: captureGroups[2],
  };
};

const parseXrefClause = (
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

const parseIdNameClause = (
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

const parseClause = (
  queryConjunction: string,
  termValue: string,
  searchTerms: SearchTermType[]
) => {
  if (!searchTerms) {
    return;
  }
  const queryConjunctionUpper = queryConjunction
    ? queryConjunction.toUpperCase()
    : Operator.AND;
  let conjunction: keyof typeof Operator;
  if (queryConjunctionUpper in Operator) {
    conjunction = queryConjunctionUpper as keyof typeof Operator;
  } else {
    throw new Error(`${queryConjunction} conjunction is not valid.`);
  }

  const [term, value] = termValue.split(':');
  if (!value) {
    const emptyClause = createEmptyClause();
    return { ...emptyClause, queryInput: { stringValue: term } };
  }

  if (term.match(/^xref/i)) {
    return parseXrefClause(term, value, conjunction, searchTerms);
  }

  if (term.match(/^organism|taxonomy/i)) {
    return parseIdNameClause(term, value, conjunction, searchTerms);
  }

  const searchTerm = findSearchTerm(term, searchTerms);
  if (!searchTerm) {
    throw new Error(`${term} not a valid term.`);
  }
  return {
    id: v1(),
    logicOperator: conjunction,
    searchTerm,
    queryInput: searchTerm.hasRange
      ? parseRangeValue(value)
      : { stringValue: value },
  } as Clause;
};

export const unpackQueryUrl = (
  query: string,
  searchTerms: SearchTermType[]
) => {
  const regexQuery = /\(?([0-9a-z_]+:?[0-9a-z\[\]\s\-\.]*)\)?(?:\s*(AND|OR|NOT)\s*)*/gi;
  const clauses: Clause[] = [];
  const matches = regexQuery.exec(query);
  if (matches) {
    matches.forEach(match => {
      const termValue = match[1];
      const conjunction = match[2] || 'AND';
      const clause = parseClause(conjunction, termValue, searchTerms);
      if (clause) {
        clauses.push(clause);
      }
    });
  }
  return clauses;
};
