// @flow
import type { Field } from './AdvancedSearchField';

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

const createSimpleSubquery = (field: Field) => {
  const { itemType, term, valuePrefix } = field.selectedNode;
  const { stringValue } = field.queryInput;
  const itemTypePrefix = getItemTypePrefix(itemType);
  const valuePrefixChecked = valuePrefix ? `${valuePrefix}-` : '';
  if (!stringValue) {
    throw new Error('Value not provided in query');
  }
  return `(${itemTypePrefix}${term}:${valuePrefixChecked}${stringValue})`;
};

const createRangeSubquery = (field: Field) => {
  const { term, itemType } = field.selectedNode;
  const { rangeFrom, rangeTo } = field.queryInput;
  const rangeFromChecked = rangeFrom || '';
  const rangeToChecked = rangeTo || '';
  const itemTypeRangePrefix = getItemTypeRangePrefix(itemType);
  return `(${itemTypeRangePrefix}${term}:[${rangeFromChecked} TO ${rangeToChecked}])`;
};

const wrapIntoEvidenceSubquery = (field: Field, subQuery: string) => {
  const { evidenceValue } = field.queryInput;
  const { term, itemType } = field.selectedNode;
  if (!evidenceValue) {
    throw new Error('Evidence value not provided');
  }
  const itemTypeEvidencePrefix = getItemTypeEvidencePrefix(itemType);
  return `(${subQuery}AND(${itemTypeEvidencePrefix}${term}:${evidenceValue}))`;
};

const createQueryString = (queryFields: Array<Field>): string => queryFields.reduce((queryAccumulator: string, field: Field) => {
  let query = '';
  if (field.queryInput.stringValue && field.queryInput.stringValue !== '') {
    query = `${query}${createSimpleSubquery(field)}`;
  }
  if (field.queryInput.rangeFrom || field.queryInput.rangeTo) {
    query = `${query}${createRangeSubquery(field)}`;
  }
  if (field.queryInput.evidenceValue && field.queryInput.evidenceValue !== '') {
    query = `${wrapIntoEvidenceSubquery(field, query)}`;
  }
  return `${queryAccumulator}${
    queryAccumulator.length > 0 && query.length > 0 ? field.logic : ''
  }${query}`;
}, '');

export default createQueryString;
