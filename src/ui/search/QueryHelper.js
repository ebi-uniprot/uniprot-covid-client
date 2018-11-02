// @flow
import type { Field } from './AdvancedSearchField';

const getItemTypePrefix = (itemType) => {
  const itemTypeToPrefixMap = {
    feature: 'ft_',
    comment: 'cc_',
    goterm: 'go_',
  };
  return itemTypeToPrefixMap[itemType] ? itemTypeToPrefixMap[itemType] : '';
};

const getItemTypeEvidencePrefix = (itemType) => {
  const itemTypeToEvidencePrefixMap = {
    feature: 'ftev_',
    comment: 'ccev_',
  };
  return itemTypeToEvidencePrefixMap[itemType] ? itemTypeToEvidencePrefixMap[itemType] : '';
};

const getItemTypeRangePrefix = itemType => (itemType === 'feature' ? 'ftlen_' : '');

const createSimpleSubquery = (field: Field) => `(${getItemTypePrefix(field.selectedNode.itemType)}${field.selectedNode.term}:${
  field.selectedNode.valuePrefix ? `${field.selectedNode.valuePrefix}-` : ''
}${field.queryInput.stringValue ? field.queryInput.stringValue : ''})`;

const createRangeSubquery = (field: Field) => `(${getItemTypeRangePrefix(field.selectedNode.itemType)}${field.selectedNode.term}:[${
  field.queryInput.rangeFrom ? field.queryInput.rangeFrom : ''
} TO ${field.queryInput.rangeTo ? field.queryInput.rangeTo : ''}])`;

const wrapIntoEvidenceSubquery = (field: Field, subQuery: string) => `(${subQuery}AND(${getItemTypeEvidencePrefix(field.selectedNode.itemType)}${
  field.selectedNode.term
}:${field.queryInput.evidenceValue}))`;

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
