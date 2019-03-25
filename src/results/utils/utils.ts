import { getQueryUrl } from '../../utils/apiUrls';
import {
  SortDirections,
  SortDirectionsType,
  SortableColumns,
  SelectedFacet,
} from '../types/resultsTypes';

export const createFacetsQueryString = (facets: SelectedFacet[]) =>
  facets.reduce(
    (queryAccumulator, facet) =>
      `${queryAccumulator} AND (${facet.name}:${facet.value})`,
    ''
  );

const getAPIQueryUrl = (
  queryString: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortBy: SortableColumns | undefined = undefined,
  sortDirectionKey: keyof SortDirectionsType | undefined = SortDirections.ascend
    .app as keyof SortDirectionsType
) => {
  const facetsQueryString = createFacetsQueryString(selectedFacets);
  return getQueryUrl(
    `${queryString}${facetsQueryString}`,
    columns,
    undefined,
    sortBy,
    sortBy && sortBy in SortableColumns
      ? SortDirections[sortDirectionKey].api
      : undefined
  );
};

export { getAPIQueryUrl };
