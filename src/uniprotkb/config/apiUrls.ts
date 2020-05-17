import queryString from 'query-string';
import joinUrl from 'url-join';
import {
  getApiSortDirection,
  SortDirection,
  SelectedFacet,
  FileFormat,
  fileFormatsWithColumns,
  fileFormatToUrlParameter,
} from '../types/resultsTypes';
import { SortableColumn } from '../types/columnTypes';

<<<<<<< HEAD:src/utils/apiUrls.ts
export const joinUrl = (...args: string[]) => urlJoin(args);

const devPrefix = 'https://wwwdev.ebi.ac.uk';
const prodPrefix = 'https://www.ebi.ac.uk';
const covidPrefix = 'https://www.ebi.ac.uk/uniprot/api/covid-19';
=======
export const devPrefix = 'https://wwwdev.ebi.ac.uk';
export const prodPrefix = 'https://www.ebi.ac.uk';
>>>>>>> uniprot/2020_05__better_fetch_and_sequences:src/uniprotkb/config/apiUrls.ts

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
  search: joinUrl(covidPrefix, '/uniprotkb/search'),
  download: joinUrl(covidPrefix, '/uniprotkb/download'),
  variation: joinUrl(prodPrefix, '/proteins/api/variation'),

  entry: (accession: string) =>
<<<<<<< HEAD:src/utils/apiUrls.ts
    joinUrl(covidPrefix, '/uniprotkb/accession', accession),

=======
    joinUrl(devPrefix, '/uniprot/api/uniprotkb/accession', accession),
>>>>>>> uniprot/2020_05__better_fetch_and_sequences:src/uniprotkb/config/apiUrls.ts
  sequenceFasta: (accession: string) => `${apiUrls.entry(accession)}.fasta`,
  entryDownload: (accession: string, format: FileFormat) =>
    format === FileFormat.fastaCanonicalIsoform
      ? `${apiUrls.search}?${queryString.stringify({
          query: `accession:${accession}`,
          includeIsoform: true,
          format: fileFormatToUrlParameter.get(
            FileFormat.fastaCanonicalIsoform
          ),
        })}`
      : `${apiUrls.entry(accession)}.${fileFormatToUrlParameter.get(format)}`,
  entryPublications: (accession: string) =>
    joinUrl(covidPrefix, '/uniprotkb/accession', accession, '/publications'),
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

export const createAccessionsQueryString = (accessions: string[]) =>
  accessions.map((accession) => `accession:${accession}`).join(' OR ');

export const getAPIQueryUrl = (
  query: string,
  columns: string[] | null,
  selectedFacets: SelectedFacet[],
  sortColumn: SortableColumn | undefined = undefined,
  sortDirection: SortDirection | undefined = SortDirection.ascend
) =>
  `${apiUrls.search}?${queryString.stringify({
    query: `${query}${createFacetsQueryString(selectedFacets)}`,
    fields: columns && columns.join(','),
    facets:
<<<<<<< HEAD:src/utils/apiUrls.ts
      'reviewed,popular_organism,other_organism,proteins_with,existence,annotation_score',
=======
      'reviewed,model_organism,proteins_with,existence,annotation_score,length',
>>>>>>> uniprot/2020_05__better_fetch_and_sequences:src/uniprotkb/config/apiUrls.ts
    sort:
      sortColumn &&
      `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`,
  })}`;

export const getUniProtPublicationsQueryUrl = (
  accession: string,
  selectedFacets: SelectedFacet[]
) =>
  `${apiUrls.entryPublications(accession)}?${queryString.stringify({
    facets: 'source,category,study_type',
    query: selectedFacets
      .map((facet) => `(${facet.name}:"${facet.value}")`)
      .join(' AND '),
  })}`;

export const getDownloadUrl = ({
  query,
  columns,
  selectedFacets,
  sortColumn,
  sortDirection = SortDirection.ascend,
  fileFormat,
  compressed = false,
  size,
  selectedAccessions = [],
}: {
  query: string;
  columns: string[];
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  fileFormat: FileFormat;
  compressed: boolean;
  size?: number;
  selectedAccessions: string[];
}) => {
  const parameters: {
    query: string;
    format: string;
    fields?: string;
    sort?: string;
    includeIsoform?: boolean;
    size?: number;
    compressed?: boolean;
  } = {
    query: selectedAccessions.length
      ? createAccessionsQueryString(selectedAccessions)
      : `${query}${createFacetsQueryString(selectedFacets)}`,
    // fallback to json if something goes wrong
    format: fileFormatToUrlParameter.get(fileFormat) || 'json',
  };
  const isColumnFileFormat = fileFormatsWithColumns.includes(fileFormat);
  if (isColumnFileFormat && sortColumn) {
    parameters.sort = `${sortColumn} ${getApiSortDirection(
      SortDirection[sortDirection]
    )}`;
  }
  if (fileFormat === FileFormat.fastaCanonicalIsoform) {
    parameters.includeIsoform = true;
  }
  if (isColumnFileFormat && columns) {
    parameters.fields = columns.join(',');
  }
  if (size && !selectedAccessions.length) {
    parameters.size = size;
  }
  if (compressed) {
    parameters.compressed = true;
  }
  return `${apiUrls.download}?${queryString.stringify(parameters)}`;
};

<<<<<<< HEAD:src/utils/apiUrls.ts
export const urlsAreEqual = (
  url1: string,
  url2: string,
  ignoreParams: string[] = []
) => {
  const urlObject1 = queryString.parseUrl(url1);
  const urlObject2 = queryString.parseUrl(url2);
  if (urlObject1.url !== urlObject2.url) {
    return false;
  }
  const paramsIntersection = uniq([
    ...Object.keys(urlObject1.query),
    ...Object.keys(urlObject1.query),
  ]);
  return paramsIntersection.every(
    (param) =>
      ignoreParams.includes(param) ||
      urlObject1.query[param] === urlObject2.query[param]
  );
=======
export const literatureApiUrls = {
  literature: joinUrl(devPrefix, '/uniprot/api/literature'),
>>>>>>> uniprot/2020_05__better_fetch_and_sequences:src/uniprotkb/config/apiUrls.ts
};

export const getPublicationURL = (id: string) =>
  joinUrl(literatureApiUrls.literature, id);

export const getPublicationsURL = (ids: string[]) =>
  `${literatureApiUrls.literature}/search?query=(${ids
    .map((id) => `id:${id}`)
    .join(' OR ')})`;
