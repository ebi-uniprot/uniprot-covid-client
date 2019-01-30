import { default as queryStringModule } from 'query-string';
import { getQueryUrl } from '../../utils/apiUrls';
import { SortDirections, SortDirectionsType } from '../sortTypes';

const createFacetsQueryString = facets => facets.reduce(
  (queryAccumulator, facet) => `${queryAccumulator} AND (${facet.name}:${facet.value})`,
  '',
);

const getAPIQueryUrl = (
  queryString: string,
  columns: [string],
  selectedFacets: [],
  sortBy: string,
  sortDirectionKey: keyof SortDirectionsType,
) => {
  console.log(sortDirectionKey);
  console.log(SortDirections[sortDirectionKey]);
  const facetsQueryString = createFacetsQueryString(selectedFacets);
  return getQueryUrl(
    `${queryString}${facetsQueryString}`,
    columns,
    undefined,
    sortBy,
    SortDirections[sortDirectionKey].api,
  );
};

export { getAPIQueryUrl };
