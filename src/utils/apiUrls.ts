import urljoin from 'url-join';
import queryString from 'query-string';
import { v1 } from 'uuid';

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

export const getQueryUrl = (encodedQueryString: string, columns: Array<string>, cursor?: string) => `${apiUrls.advanced_search}?${queryString.stringify({
  query: encodedQueryString,
  fields: columns.join(','),
  includeFacets: true,
})}`;
