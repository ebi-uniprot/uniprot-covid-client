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
  const itemTypePrefix = getItemTypePrefix(itemType);
  return `${itemTypePrefix}${term}${term ? ':' : ''}`;
};

const createValueString = (
  term: string,
  valuePrefix: string | undefined,
  stringValue: string,
  id: string | undefined,
) => {
  if (term === 'ec') {
    if (id) {
      return id;
    }
    throw new Error('Value not provided in query');
  }
  if (['organism', 'taxonomy'].includes(term) && id) {
    return id;
  }
  const valuePrefixChecked = valuePrefix ? `${valuePrefix}-` : '';
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

const getEvidenceSubquery = (clause: Clause) => {
  const { evidenceValue } = clause.queryInput;
  const { term, itemType } = clause.field;
  if (!evidenceValue) {
    throw new Error('Evidence value not provided');
  }
  const itemTypeEvidencePrefix = getItemTypeEvidencePrefix(itemType);
  return `(${itemTypeEvidencePrefix}${term}:${evidenceValue})`;
};

const createQueryString = (clauses: Array<Clause> = []): string => clauses.reduce((queryAccumulator: string, clause: Clause) => {
  const query = [];
  if (
    (clause.queryInput.id && clause.queryInput.id !== '')
      || (clause.queryInput.stringValue && clause.queryInput.stringValue !== '')
  ) {
    query.push(createSimpleSubquery(clause));
  }
  if (clause.queryInput.rangeFrom || clause.queryInput.rangeTo) {
    query.push(createRangeSubquery(clause));
  }
  if (clause.queryInput.evidenceValue && clause.queryInput.evidenceValue !== '') {
    query.push(getEvidenceSubquery(clause));
  }
  let queryJoined = query.join(' AND ');
  if (query.length > 1) {
    queryJoined = `(${queryJoined})`;
  }
  return `${queryAccumulator}${
    queryAccumulator.length > 0 && query.length > 0 ? ` ${clause.logicOperator} ` : ''
  }${queryJoined}`;
}, '');

export { createQueryString };
