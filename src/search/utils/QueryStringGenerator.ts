import { Clause } from '../types/searchTypes';

type IPrefixMap = {
  feature: string;
  comment: string;
  [key: string]: string;
};

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

const getItemTypeRangePrefix = (itemType: string) =>
  itemType === 'feature' ? 'ftlen_' : '';

const createTermString = (
  term: string | undefined,
  itemType: string,
  id: string | undefined
) => {
  if (term === undefined) {
    throw new Error('term is undefined');
  }
  if (term === 'ec') {
    if (id) {
      return 'ec:';
    }
    throw new Error('ID value not provided in query');
  }
  if (['organism', 'taxonomy', 'host'].includes(term)) {
    if (id) {
      return `${term}_id:`;
    }
    return `${term}_name:`;
  }
  const itemTypePrefix = getItemTypePrefix(itemType);
  return `${itemTypePrefix}${term}${term ? ':' : ''}`;
};

const createValueString = (
  term: string | undefined,
  valuePrefix: string | undefined,
  stringValue: string,
  id: string | undefined
) => {
  if (term === undefined) {
    throw new Error('term is undefined');
  }
  if (term === 'ec') {
    if (id) {
      return id;
    }
    throw new Error('ID value not provided in query');
  }
  if (id) {
    if (['cofactor_chebi', 'catalytic_activity'].includes(term)) {
      return `"${id}"`;
    }
    if (
      ['organism', 'taxonomy', 'host', 'keyword', 'scl_term'].includes(term)
    ) {
      return id;
    }
  }

  // We are testing for term=xref and valuePrefix=any because the
  // search API expects the valuePrefix to be ommited in this case.
  // eg xref:foo rather than xref_any:foo
  const valuePrefixChecked =
    valuePrefix && !(term === 'xref' && valuePrefix === 'any')
      ? `${valuePrefix}-`
      : '';
  return `${valuePrefixChecked}${stringValue}`;
};

const createSimpleSubquery = (clause: Clause) => {
  if (clause.searchTerm.itemType === 'group') {
    throw Error('Cannot create a query with a group term.');
  }
  const { itemType, term, valuePrefix } = clause.searchTerm;
  const { stringValue, id } = clause.queryInput;
  if (!stringValue) {
    throw new Error('Value not provided in query');
  }
  if (term === 'All') {
    return stringValue;
  }
  const termString = createTermString(term, itemType, id);
  const valueString = createValueString(term, valuePrefix, stringValue, id);
  return `(${termString}${valueString})`;
};

const createRangeSubquery = (clause: Clause) => {
  const { term, itemType } = clause.searchTerm;
  const { rangeFrom, rangeTo } = clause.queryInput;
  const rangeFromChecked = rangeFrom || '';
  const rangeToChecked = rangeTo || '';
  const itemTypeRangePrefix = getItemTypeRangePrefix(itemType);
  return `(${itemTypeRangePrefix}${term}:[${rangeFromChecked} TO ${rangeToChecked}])`;
};

const getEvidenceSubquery = (clause: Clause) => {
  const { evidenceValue } = clause.queryInput;
  const { term, itemType } = clause.searchTerm;
  if (!evidenceValue) {
    throw new Error('Evidence value not provided');
  }
  const itemTypeEvidencePrefix = getItemTypeEvidencePrefix(itemType);
  return `(${itemTypeEvidencePrefix}${term}:${evidenceValue})`;
};

const createQueryString = (clauses: Clause[] = []): string =>
  clauses.reduce((queryAccumulator: string, clause: Clause) => {
    const query = [];
    if (
      (clause.queryInput.id && clause.queryInput.id !== '') ||
      (clause.queryInput.stringValue && clause.queryInput.stringValue !== '')
    ) {
      query.push(createSimpleSubquery(clause));
    }
    if (clause.queryInput.rangeFrom || clause.queryInput.rangeTo) {
      query.push(createRangeSubquery(clause));
    }
    if (
      clause.queryInput.evidenceValue &&
      clause.queryInput.evidenceValue !== ''
    ) {
      query.push(getEvidenceSubquery(clause));
    }
    let queryJoined = query.join(' AND ');
    if (query.length > 1) {
      queryJoined = `(${queryJoined})`;
    }

    let logicOperator = '';
    if (queryAccumulator.length > 0 && query.length > 0) {
      logicOperator = ` ${clause.logicOperator} `;
    } else if (
      queryAccumulator.length === 0 &&
      clause.logicOperator === 'NOT'
    ) {
      logicOperator = `${clause.logicOperator} `;
    }

    return `${queryAccumulator}${logicOperator}${queryJoined}`;
  }, '');

export default createQueryString;
