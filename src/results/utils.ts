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

export const setUrlParams = () => null;

// const setURLParams = (
//   query: string,
//   selectedFacets: SelectedFacet[],
//   sortColumn?: string,
//   sortDirection?: SortDirection
// ): void => {
//   const { history } = this.props;
//   history.push({
//     pathname: '/uniprotkb',
//     search: [
//       `query=${query}${this.facetsAsString(selectedFacets)}`,
//       `${sortColumn ? `&sort=${sortColumn}` : ''}`,
//       `${sortDirection ? `&dir=${sortDirection}` : ''}`,
//     ].join(''),
//   });
// };
