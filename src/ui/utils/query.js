// @flow
import type { Clause } from '../components/ClauseList';

const getItemTypePrefix = (itemType) => {
  const itemTypeToPrefixMap = {
    feature: 'ft_',
    comment: 'cc_',
  };
  return itemTypeToPrefixMap[itemType] || '';
};

const getItemTypeEvidencePrefix = (itemType) => {
  const itemTypeToEvidencePrefixMap = {
    feature: 'ftev_',
    comment: 'ccev_',
  };
  return itemTypeToEvidencePrefixMap[itemType] || '';
};

const getItemTypeRangePrefix = itemType => (itemType === 'feature' ? 'ftlen_' : '');

const createSimpleSubquery = (clause: Clause) => {
  const { itemType, term, valuePrefix } = clause.field;
  const { stringValue } = clause.queryInput;
  const itemTypePrefix = getItemTypePrefix(itemType);
  const valuePrefixChecked = valuePrefix ? `${valuePrefix}-` : '';
  if (!stringValue) {
    throw new Error('Value not provided in query');
  }
  return `(${itemTypePrefix}${term}:${valuePrefixChecked}${stringValue})`;
};

const createRangeSubquery = (clause: Clause) => {
  const { term, itemType } = clause.field;
  const { rangeFrom, rangeTo } = clause.queryInput;
  const rangeFromChecked = rangeFrom || '';
  const rangeToChecked = rangeTo || '';
  const itemTypeRangePrefix = getItemTypeRangePrefix(itemType);
  return `(${itemTypeRangePrefix}${term}:[${rangeFromChecked} TO ${rangeToChecked}])`;
};

const wrapIntoEvidenceSubquery = (clause: Clause, subQuery: string) => {
  const { evidenceValue } = clause.queryInput;
  const { term, itemType } = clause.field;
  if (!evidenceValue) {
    throw new Error('Evidence value not provided');
  }
  const itemTypeEvidencePrefix = getItemTypeEvidencePrefix(itemType);
  return `(${subQuery}AND(${itemTypeEvidencePrefix}${term}:${evidenceValue}))`;
};

const createQueryString = (clauses: Array<Clause>): string => clauses.reduce((queryAccumulator: string, clause: Clause) => {
  console.log(clauses);
  console.log(clause);
  let query = '';
  if (clause.queryInput.stringValue && clause.queryInput.stringValue !== '') {
    query = `${query}${createSimpleSubquery(clause)}`;
  }
  if (clause.queryInput.rangeFrom || clause.queryInput.rangeTo) {
    query = `${query}${createRangeSubquery(clause)}`;
  }
  if (clause.queryInput.evidenceValue && clause.queryInput.evidenceValue !== '') {
    query = `${wrapIntoEvidenceSubquery(clause, query)}`;
  }
  return `${queryAccumulator}${
    queryAccumulator.length > 0 && query.length > 0 ? clause.logicOperator : ''
  }${query}`;
}, '');

export default createQueryString;