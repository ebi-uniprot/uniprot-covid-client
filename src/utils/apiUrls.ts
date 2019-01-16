import urljoin from 'url-join';
import queryString from 'query-string';
import { v1 } from 'uuid';
import { createEmptyClause } from '../search/utils/clause';

export const joinUrl = (...args: string[]) => urljoin(args);

const prefix = '//wwwdev.ebi.ac.uk';

const apiUrls = {
  // uniprotkb advanced search terms
  advanced_search_terms: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/search_terms'),
  // Annotation evidence used by advanced search
  evidences: {
    annotation: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/annotation_evidences'),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used by advanced search
  database_xefs: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/databases'),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  database_fields: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/databasefields'),
  // All result fields except database cross reference fields
  results_fields: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/resultfields'),
  // Retrieve results
  advanced_search: joinUrl(prefix, '/uniprot/api/uniprotkb/search'),
};

export default apiUrls;

const RE_QUERY = /\?$/;

export const getSuggesterUrl = (url: string, value: string) => joinUrl(prefix, url.replace(RE_QUERY, value));

export const getUniProtQueryUrl = (
  encodedUniprotQueryString: string,
  columns: Array<string>,
  filters: Array<string>,
  cursor: string,
) => `${apiUrls.advanced_search}?${queryString.stringify({
  query: encodedUniprotQueryString,
  fields: columns.join(','),
  includeFacets: true,
})}`;

const findTopLevelParenthesisIndices = (query) => {
  let balance = 0;
  let parenthesisIndices = [0, 0];
  const topLevelParenthesisIndices = [];
  for (let i = 0; i < query.length; i += 1) {
    const c = query[i];
    if (c === '(') {
      balance += 1;
      if (balance === 1) {
        parenthesisIndices = [i, 0];
      }
    } else if (c === ')') {
      balance -= 1;
      if (balance === 0) {
        parenthesisIndices[1] = i;
        topLevelParenthesisIndices.push(parenthesisIndices);
      }
    }
  }
  return topLevelParenthesisIndices;
};

const findSearchTerm = (queryField, value, searchTerms) => searchTerms.find((field) => {
  if (field.items) {
    return findSearchTerm(queryField, value, field.items);
  }
  return field.term === queryField;
});

const ALLOWED_CONJUNCTIONS = ['AND', 'OR', 'NOT'];

const parseClause = (conjunction, fieldValue, searchTerms) => {
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

export const getQueryFromUrl = (query) => {
  const m = query.match(/\?query=(.*)/);
  return m && m[1];
};

export const unpackQueryUrl = (query, searchTerms) => {
  const parenthesisIndices = findTopLevelParenthesisIndices(query);
  let conjunctionIndex = 0;
  if (!parenthesisIndices.length) {
    return [parseClause('AND', query, searchTerms)];
  }
  return parenthesisIndices.map((parenthesis) => {
    const conjunction = query.slice(conjunctionIndex, parenthesis[0]);
    const fieldValue = query.slice(parenthesis[0] + 1, parenthesis[1]);
    conjunctionIndex = parenthesis[1] + 1;
    return parseClause(conjunction, fieldValue, searchTerms);
  });
};
