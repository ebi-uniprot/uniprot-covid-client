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

const findSearchTerm = (
  queryField: string,
  value: string,
  searchTerms: Array<FieldType>,
): FieldType | undefined => searchTerms.find((field: FieldType) => {
  if (field.items) {
    return findSearchTerm(queryField, value, field.items);
  }
  return field.term === queryField;
});

const ALLOWED_CONJUNCTIONS = ['AND', 'OR', 'NOT'];

const parseClause = (conjunction: string, fieldValue: string, searchTerms: Array<FieldType>) => {
  if (!searchTerms) {
    return false;
  }
  const conjunctionUpper = conjunction ? conjunction.toUpperCase() : 'AND';
  const [field, value] = fieldValue.split(':');
  if (!value) {
    const allClause = createEmptyClause();
    allClause.queryInput = { stringValue: field };
    return allClause;
  }
  if (!ALLOWED_CONJUNCTIONS.includes(conjunctionUpper)) {
    throw new Error(`${conjunctionUpper} conjunction is not part of ${ALLOWED_CONJUNCTIONS}`);
  }
  const searchTerm = findSearchTerm(field, value, searchTerms);
  if (!searchTerm) {
    throw new Error(`${field} not a valid field.`);
  }
  const queryInput = {};
  switch (searchTerm.dataType) {
    case 'date':
      // (created:%5B2019-01-01%20TO%200001-12-12%5D)
      console.log(value);
      break;
    case 'enum':
    case 'string':
      if (searchTerm.hasRange) {
        console.log(value);
      }
      queryInput.stringValue = value;
      break;
    case 'integer':
      console.log('integer');
      break;
    default:
      return null;
  }
  return {
    id: v1(),
    logicOperator: conjunctionUpper,
    field: searchTerm,
    queryInput,
  };
};

export const unpackQueryUrl = (query: string, searchTerms: Array<FieldType>) => {
  const regex_query = /\(?([0-9a-z]+:?[0-9a-z\[\]\-\.]*)\)?(?:\s*(AND|OR|NOT)\s*)*/gi;
  let match;
  const clauses = [];
  while ((match = regex_query.exec(query)) !== null) {
    const fieldValue = match[1];
    const conjunction = match[2] || 'AND';
    clauses.push(parseClause(conjunction, fieldValue, searchTerms));
  }
  return clauses;
};
