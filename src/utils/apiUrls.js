import urljoin from 'url-join';
import queryString from 'query-string';

const prefix = '//wwwdev.ebi.ac.uk';

export default {
  // uniprotkb advanced search terms
  advanced_search_terms: urljoin(prefix, '/uniprot/api/configure/uniprotkb/search_terms'),
  // Annotation evidence used by advanced search
  evidences: {
    annotation: urljoin(prefix, '/uniprot/api/configure/uniprotkb/annotation_evidences'),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: urljoin(prefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used by advanced search
  database_xefs: urljoin(prefix, '/uniprot/api/configure/uniprotkb/databases'),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  database_fields: urljoin(prefix, '/uniprot/api/configure/uniprotkb/databasefields'),
  // All result fields except database cross reference fields
  results_fields: urljoin(prefix, '/uniprot/api/configure/uniprotkb/resultfields'),
  // Retrieve results
  advanced_search: urljoin(prefix, '/uniprot/search'),
};

const RE_QUERY = /\?$/;

export const getSuggesterUrl = (url, value) => urljoin(prefix, url.replace(RE_QUERY, value));

export const getUniProtQueryUrl = (uniprotQueryString, columns, filters, cursor) => urljoin(
  this.advanced_search,
  '/?',
  queryString.stringify({
    query: encodeURI(uniprotQueryString),
    fields: columns,
  }),
);
