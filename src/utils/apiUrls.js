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

export const getUniProtQueryUrl = (encodedUniprotQueryString, columns, filters, cursor) => joinUrl(
  apiUrls.advanced_search,
  '/?',
  queryString.stringify({
    query: encodedUniprotQueryString,
    fields: columns.join(','),
  }),
);
