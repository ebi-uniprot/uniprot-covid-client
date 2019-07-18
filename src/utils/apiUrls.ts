import urlJoin from 'url-join';
import queryString from 'query-string';
import {
  SortableColumn,
  SortDirectionApi,
} from '../results/types/resultsTypes';

export const joinUrl = (...args: string[]) => urlJoin(args);

const devPrefix = 'https://wwwdev.ebi.ac.uk';
const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  // uniprotkb advanced search terms
  advanced_search_terms: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/search_terms'
  ),
  // Annotation evidence used by advanced search
  evidences: {
    annotation: joinUrl(
      devPrefix,
      '/uniprot/api/configure/uniprotkb/annotation_evidences'
    ),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(devPrefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used by advanced search
  database_xefs: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/databases'
  ),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  database_fields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/databasefields'
  ),
  // All result fields except database cross reference fields
  results_fields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/resultfields'
  ),
  // Retrieve results
  advanced_search: joinUrl(devPrefix, '/uniprot/api/uniprotkb/search'),
  variation: joinUrl(prodPrefix, '/proteins/api/variation'),
  entry: (accession: string) =>
    joinUrl(devPrefix, '/uniprot/api/uniprotkb/accession', accession),
};

export default apiUrls;

const RE_QUERY = /\?$/;
export const getSuggesterUrl = (url: string, value: string) =>
  joinUrl(devPrefix, url.replace(RE_QUERY, value));

export const getQueryUrl = (
  encodedQueryString: string,
  columns: string[],
  sortBy?: SortableColumn | undefined,
  sortDirection?: SortDirectionApi | undefined
) =>
  `${apiUrls.advanced_search}?${queryString.stringify({
    query: encodedQueryString,
    fields: columns.join(','),
    facets: 'reviewed,popular_organism,other_organism',
    sort: sortBy && `${sortBy} ${sortDirection}`,
  })}`;
