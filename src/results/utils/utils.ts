import queryString from 'query-string';
import { getQueryUrl } from '../../utils/apiUrls';

const createFacetsQueryString = facets => facets.reduce(
  (queryAccumulator, facet) => `${queryAccumulator} AND (${facet.name}:${facet.value})`,
  '',
);

const getAPIQueryUrl = (queryString: string, columns: [string], selectedFacets: {}) => {
  const facetsQueryString = createFacetsQueryString(selectedFacets);
  return getQueryUrl(`${queryString}${facetsQueryString}`, columns);
};

export { getAPIQueryUrl };
