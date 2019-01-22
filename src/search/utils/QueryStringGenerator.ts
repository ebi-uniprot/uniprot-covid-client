import { Clause } from '../types/searchTypes';

interface IPrefixMap {
  feature: string;
  comment: string;
  [key: string]: string;
}

const getItemTypePrefix = (itemType: string) => {
  const itemTypeToPrefixMap: IPrefixMap = {
    feature: 'ft_',
    comment: 'cc_',
  };
  return itemTypeToPrefixMap[itemType] || '';
};

const getItemTypeEvidencePrefix = (itemType: string) => {
  const itemTypeToEvidencePrefixMap: IPrefixMap = {
    feature: 'ftev_',
    comment: 'ccev_',
  };
  return itemTypeToEvidencePrefixMap[itemType] || '';
};

const getItemTypeRangePrefix = (itemType: string) => (itemType === 'feature' ? 'ftlen_' : '');

const createTermString = (term: string, itemType: string, id: string | undefined) => {
  const itemTypePrefix = getItemTypePrefix(itemType);
  if (term === 'ec') {
    if (id) {
      return 'ec:';
    }
    throw new Error('Value not provided in query');
  }
  if (['organism', 'taxonomy'].includes(term)) {
    if (id) {
      return `${term}_id:`;
    }
    return `${term}_name:`;
  }
  return `${itemTypePrefix}${term}${term ? ':' : ''}`;
};

const createValueString = (
  term: string,
  valuePrefix: string | undefined,
  stringValue: string,
  id: string | undefined,
) => {
  const valuePrefixChecked = valuePrefix ? `${valuePrefix}-` : '';
  if (term === 'ec') {
    if (id) {
      return id;
    }
    throw new Error('Value not provided in query');
  }
  if (['organism', 'taxonomy'].includes(term) && id) {
    return id;
  }
  return `${valuePrefixChecked}${stringValue}`;
};

const createSimpleSubquery = (clause: Clause) => {
  const { itemType, term, valuePrefix } = clause.field;
  const { stringValue, id } = clause.queryInput;
  if (!stringValue) {
    throw new Error('Value not provided in query');
  }
  const termString = createTermString(term, itemType, id);
  const valueString = createValueString(term, valuePrefix, stringValue, id);
  return `(${termString}${valueString})`;
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
  return `(${subQuery} AND (${itemTypeEvidencePrefix}${term}:${evidenceValue}))`;
};

const createQueryString = (clauses: Array<Clause> = []): string => clauses.reduce((queryAccumulator: string, clause: Clause) => {
  let query = '';
  if (
    (clause.queryInput.id && clause.queryInput.id !== '')
      || (clause.queryInput.stringValue && clause.queryInput.stringValue !== '')
  ) {
    query = `${query}${createSimpleSubquery(clause)}`;
  }
  if (clause.queryInput.rangeFrom || clause.queryInput.rangeTo) {
    query = `${query}${createRangeSubquery(clause)}`;
  }
  if (clause.queryInput.evidenceValue && clause.queryInput.evidenceValue !== '') {
    query = `${wrapIntoEvidenceSubquery(clause, query)}`;
  }
  return `${queryAccumulator}${
    queryAccumulator.length > 0 && query.length > 0 ? ` ${clause.logicOperator} ` : ''
  }${query}`;
}, '');

export { createQueryString };
