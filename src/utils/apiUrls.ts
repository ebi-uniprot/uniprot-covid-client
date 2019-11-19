import urlJoin from 'url-join';
import queryString from 'query-string';
import {
  SortDirectionApi,
  getApiSortDirection,
  SortDirection,
  SelectedFacet,
} from '../results/types/resultsTypes';
import { SortableColumn } from '../model/types/ColumnTypes';
import { FileFormat } from '../results/types/resultsTypes';

export const joinUrl = (...args: string[]) => urlJoin(args);

const devPrefix = 'https://wwwdev.ebi.ac.uk';
const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  // uniprotkb advanced search terms
  advancedSearchTerms: joinUrl(
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

  databaseXrefs: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/databases'
  ),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  databaseFields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/databasefields'
  ),
  // All result fields except database cross reference fields
  resultsFields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/resultfields'
  ),
  // Retrieve results
  advancedSearch: joinUrl(devPrefix, '/uniprot/api/uniprotkb/search'),
  variation: joinUrl(prodPrefix, '/proteins/api/variation'),

  entry: (accession: string) =>
    joinUrl(devPrefix, '/uniprot/api/uniprotkb/accession', accession),
};

export default apiUrls;

const RE_QUERY = /\?$/;
export const getSuggesterUrl = (url: string, value: string) =>
  joinUrl(devPrefix, url.replace(RE_QUERY, value));

export const createFacetsQueryString = (facets: SelectedFacet[]) =>
  /**
   * Add double quotes to facet values which contain
   * spaces as otherwise the backend doesn't escape special characters
   * such as '.' or '-'.
   * Single word values shouldn't have double quotes as they can be boolean.
   * Range queries (/^\[.*]$/) should not have double quotes either.
   * */
  facets.reduce(
    (queryAccumulator, facet) =>
      `${queryAccumulator} AND (${facet.name}:${
        facet.value.indexOf(' ') >= 0 && !facet.value.match(/^\[.*\]$/)
          ? `"${facet.value}"`
          : facet.value
      })`,
    ''
  );

export const getQueryUrl = (
  query: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortColumn: SortableColumn | undefined = undefined,
  sortDirection: SortDirection | undefined = SortDirection.ascend
) =>
  `${apiUrls.advancedSearch}?${queryString.stringify({
    query: `${query}${createFacetsQueryString(selectedFacets)}`,
    fields: columns.join(','),
    facets:
      'reviewed,popular_organism,proteins_with,existence,annotation_score,length',
    sort:
      sortColumn &&
      `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`,
  })}`;

const fileFormatToAcceptHeader = new Map<FileFormat, string>([
  [FileFormat.fastaCanonical, 'FASTA (canonical)'],
  [FileFormat.fastaCanonicalIsoform, 'FASTA (canonical & isoform)'],
  [FileFormat.tsv, 'TSV'],
  [FileFormat.excel, 'Excel'],
  [FileFormat.xml, 'XML'],
  [FileFormat.rdfXml, 'RDF/XML'],
  [FileFormat.text, 'Text'],
  [FileFormat.gff, 'GFF'],
  [FileFormat.list, 'List'],
  [FileFormat.json, 'JSON'],
]);

// export const getDownloadUrl = (
//   query: string,
//   format: FileFormat
//   columns?: string[],
//   sortBy?: SortableColumn | undefined,
//   sortDirection?: SortDirectionApi | undefined
// ) =>
//   `${apiUrls.advancedSearch}?${queryString.stringify({
//     query: encodedQueryString,
//     fields: columns.join(','),
//     facets: 'reviewed,popular_organism,proteins_with,existence,annotation_score,length',
//     sort: sortBy && `${sortBy} ${sortDirection}`,
//   })}`;
