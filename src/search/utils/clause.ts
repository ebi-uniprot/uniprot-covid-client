import { v1 } from 'uuid';
import { serializableDeepAreEqual, removeProperty } from '../../utils/utils';
import { Operator, Input } from '../types/searchTypes';
import { FieldType } from '../types/searchTypes';

type Clause = {
  id: string;
  logicOperator: Operator;
  field: {
    label: string;
    term: string;
    example: string;
    itemType: string; // TODO should be enum?
    dataType: string; // TODO should be enum?
    id: string;
  };
  queryInput: Input;
};

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
  field: {
    label: 'Any',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: 'single',
    dataType: 'string',
    id: 'id_Any',
  },
  queryInput: {},
});

export const clausesAreEqual = (clause1: Clause, clause2: Clause) => serializableDeepAreEqual(removeProperty(clause1, 'id'), removeProperty(clause2, 'id'));

const findSearchTermRecursive = (
  queryField: string,
  searchTerms: Array<FieldType>,
  valuePrefix = '',
): FieldType | undefined => {
  for (let i = 0; i < searchTerms.length; i++) {
    const searchTerm = searchTerms[i];
    if (valuePrefix && searchTerm.valuePrefix === valuePrefix && searchTerm.term === queryField) return searchTerm;
    if (!valuePrefix && searchTerm.term === queryField) return searchTerm;
    if (searchTerm.items) {
      const found = findSearchTermRecursive(queryField, searchTerm.items, valuePrefix);
      if (found) return found;
    }
  }
};

const findSearchTerm = (
  queryField: string,
  searchTerms: Array<FieldType>,
  valuePrefix = '',
): FieldType | undefined => {
  const searchTerm = findSearchTermRecursive(queryField, searchTerms, valuePrefix);
  if (!searchTerm) {
    throw new Error(`${queryField} not a valid field.`);
  }
  return searchTerm;
};

const parseRangeValue = (value: string) => {
  const regex_range = /\[([0-9\-]+)\s*TO\s*([0-9\-]+)\]/gi;
  const capture_groups = regex_range.exec(value);
  if (!capture_groups || (!capture_groups[1] && !capture_groups[2])) {
    throw new Error(`${value} value is not a valid range`);
  }
  return {
    rangeFrom: capture_groups[1],
    rangeTo: capture_groups[2],
  };
};

const getXrefAnySearchTerm = searchTerms => searchTerms
  .find(x => x.id === 'id_group_cross_references')[0]
  .items.find(x => x.id === 'id_group_any').items[0];

const parseXrefClause = (field, value, conjunction, searchTerms: Array<FieldType>) => {
  const clause = {
    id: v1(),
    logicOperator: conjunction,
  };
  const tokens = value.split('-');
  if (tokens.length === 1) {
    // Only a value is provided so this is an xref any search
    return {
      ...clause,
      field: getXrefAnySearchTerm(searchTerms),
      queryInput: { stringValue: tokens[0] },
    };
  }
  if (tokens.length === 2) {
    return {
      ...clause,
      field: findSearchTerm('xref', searchTerms, tokens[0]),
      queryInput: { stringValue: tokens[1] },
    };
  }
  throw new Error(`${value} is not a properly formed xref.`);
};

const parseIdNameClause = (queryField, value, conjunction, searchTerms) => {
  const [field, searchType] = queryField.split('_');
  const searchTerm = findSearchTerm(field, searchTerms);

  if (searchType === 'id') {
    return {
      id: v1(),
      logicOperator: conjunction,
      field: searchTerm,
      queryInput: { stringValue: value },
    };
  }
  throw new Error(`${queryField} not a valid _id or _name style term.`);
};

const parseClause = (conjunction: string, fieldValue: string, searchTerms: Array<FieldType>) => {
  if (!searchTerms) {
    return false;
  }
  const conjunctionUpper = conjunction ? conjunction.toUpperCase() : 'AND';
  const ALLOWED_CONJUNCTIONS = ['AND', 'OR', 'NOT'];
  if (!ALLOWED_CONJUNCTIONS.includes(conjunctionUpper)) {
    throw new Error(`${conjunctionUpper} conjunction is not part of ${ALLOWED_CONJUNCTIONS}.`);
  }

  const [field, value] = fieldValue.split(':');
  if (!value) {
    const emptyClause = createEmptyClause();
    return { ...emptyClause, queryInput: { stringValue: field } };
  }

  if (field.match(/^xref/i)) {
    return parseXrefClause(field, value, conjunction, searchTerms);
  }

  if (field.match(/^organism|taxonomy/i)) {
    const t = parseIdNameClause(field, value, conjunction, searchTerms);
    return t;
  }

  const searchTerm = findSearchTerm(field, searchTerms);
  if (!searchTerm) {
    throw new Error(`${field} not a valid field.`);
  }
  return {
    id: v1(),
    logicOperator: conjunctionUpper,
    field: searchTerm,
    queryInput: searchTerm.hasRange ? parseRangeValue(value) : { stringValue: value },
  };
};

export const unpackQueryUrl = (query: string, searchTerms: Array<FieldType>) => {
  const regex_query = /\(?([0-9a-z_]+:?[0-9a-z\[\]\s\-\.]*)\)?(?:\s*(AND|OR|NOT)\s*)*/gi;
  let match;
  const clauses: Array<Clause> = [];
  while ((match = regex_query.exec(query)) !== null) {
    const fieldValue = match[1];
    const conjunction = match[2] || 'AND';
    clauses.push(parseClause(conjunction, fieldValue, searchTerms));
  }
  return clauses;
};
