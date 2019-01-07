import urljoin from 'url-join';
import queryString from 'query-string';

export const joinUrl = (...args) => urljoin(args);

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

export const getSuggesterUrl = (url, value) => joinUrl(prefix, url.replace(RE_QUERY, value));

export const getUniProtQueryUrl = (encodedUniprotQueryString, columns, filters, cursor) => `${apiUrls.advanced_search}?${queryString.stringify({
  query: encodedUniprotQueryString,
  fields: columns.join(','),
})}`;

const findTopLevelParenthesis = (queryUrl) => {
  console.log(queryUrl);
  let balance = 0;
  let parenthesisIndices = [0, 0];
  const topLevelParenthesisIndices = [];
  for (let i = 0; i < queryUrl.length; i += 1) {
    const c = queryUrl[i];
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

export const unpackQueryUrl = (queryUrl) => {
  const t = findTopLevelParenthesis(queryUrl);
  console.log(t);
};

// def parse_clause(conjunction, field_value):
//     if not conjunction:
//         conjunction = 'AND'
//     field, value = field_value.split(':')
//     print('conjunction', conjunction, 'field', field, 'value', value)
