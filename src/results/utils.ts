import queryStringModule from 'query-string';
import { SelectedFacet, SortDirection } from './types/resultsTypes';
import { SortableColumn } from '../model/types/ColumnTypes';

const facetsAsArray = (facetString: string): SelectedFacet[] => {
  return facetString.split(',').map((stringItem) => {
    const [name, value] = stringItem.split(':');
    return {
      name,
      value,
    };
  });
};

export const getURLParams = (
  url: string
): {
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
} => {
  const urlParams = queryStringModule.parse(url);
  const { query, facets, sort, dir } = urlParams;

  let selectedFacets: SelectedFacet[] = [];
  if (facets && typeof facets === 'string') {
    selectedFacets = facetsAsArray(facets);
  }
  const sortDirection = dir as keyof typeof SortDirection;

  return {
    query: query && typeof query === 'string' ? query : '',
    selectedFacets,
    sortColumn: sort as SortableColumn,
    sortDirection: sortDirection && SortDirection[sortDirection],
  };
};

const facetsAsString = (facets: SelectedFacet[]): string => {
  if (!facets || facets.length <= 0) {
    return '';
  }
  return facets.reduce(
    (accumulator, facet, i) =>
      `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
    '&facets='
  );
};

export const setURLParams = (
  history,
  query: string,
  selectedFacets: SelectedFacet[],
  sortColumn?: string,
  sortDirection?: SortDirection
): void => {
  history.push({
    pathname: '/uniprotkb',
    search: [
      `query=${query}${facetsAsString(selectedFacets)}`,
      `${sortColumn ? `&sort=${sortColumn}` : ''}`,
      `${sortDirection ? `&dir=${sortDirection}` : ''}`,
    ].join(''),
  });
};
