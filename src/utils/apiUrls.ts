import urlJoin from 'url-join';
import queryString from 'query-string';
import {
  SortableColumn,
  SortDirectionApi,
} from '../results/types/resultsTypes';

export const joinUrl = (...args: string[]) => urlJoin(args);

const prefix = '//wwwdev.ebi.ac.uk';

const apiUrls = {
  // uniprotkb advanced search terms
  advancedSearchTerms: joinUrl(
    prefix,
    '/uniprot/api/configure/uniprotkb/search_terms'
  ),
  // Annotation evidence used by advanced search
  evidences: {
    annotation: joinUrl(
      prefix,
      '/uniprot/api/configure/uniprotkb/annotation_evidences'
    ),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used by advanced search
  databaseXrefs: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/databases'),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  databaseFields: joinUrl(
    prefix,
    '/uniprot/api/configure/uniprotkb/databasefields'
  ),
  // All result fields except database cross reference fields
  resultsFields: joinUrl(
    prefix,
    '/uniprot/api/configure/uniprotkb/resultfields'
  ),
  // Retrieve results
  advancedSearch: joinUrl(prefix, '/uniprot/api/uniprotkb/search'),
  entry: (accession: string) =>
    joinUrl(prefix, '/uniprot/api/uniprotkb/accession', accession),
};

export default apiUrls;

const RE_QUERY = /\?$/;
export const getSuggesterUrl = (url: string, value: string) =>
  joinUrl(prefix, url.replace(RE_QUERY, value));

export const getQueryUrl = (
  encodedQueryString: string,
  columns: string[],
  sortBy?: SortableColumn | undefined,
  sortDirection?: SortDirectionApi | undefined
) =>
  `${apiUrls.advancedSearch}?${queryString.stringify({
    query: encodedQueryString,
    fields: columns.join(','),
    facets: 'reviewed,popular_organism,other_organism',
    sort: sortBy && `${sortBy} ${sortDirection}`,
  })}`;
