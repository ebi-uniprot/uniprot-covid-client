import { getQueryUrl } from '../../utils/apiUrls';

const createFacetsQueryString = (facets: Facet[]) =>
  facets.reduce(
    (queryAccumulator, facet) =>
      `${queryAccumulator} AND (${facet.name}:${facet.value})`,
    ''
  );

interface IApiSortDirection {
  ascend: string;
  descend: string;
}

const apiSortDirectionMap: IApiSortDirection = {
  ascend: 'asc',
  descend: 'desc'
};

const getAPIQueryUrl = (
  queryString: string,
  columns: [string],
  selectedFacets: [],
  sortBy: string,
  sortDirection: string
) => {
  const facetsQueryString = createFacetsQueryString(selectedFacets);
  const key: keyof IApiSortDirection = sortDirection as keyof IApiSortDirection;
  const apiSortDirection = apiSortDirectionMap[key];
  return getQueryUrl(
    `${queryString}${facetsQueryString}`,
    columns,
    undefined,
    sortBy,
    apiSortDirection
  );
};

export { getAPIQueryUrl };
