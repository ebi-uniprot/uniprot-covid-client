import { getAPIQueryUrl, createFacetsQueryString } from '../utils';

describe('utils', () => {
  test('should generate facet query', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
    ];
    const queryString = getAPIQueryUrl('cdc7', [], facets);
    expect(queryString).toBe(
      'https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/search?facets=reviewed%2Cpopular_organism%2Cother_organism&fields=&query=cdc7%20AND%20%28facet1%3Avalue%201%29%20AND%20%28facet2%3Avalue%203%29'
    );
  });

  test('should generate facet query', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
    ];
    const queryString = createFacetsQueryString(facets);
    expect(queryString).toBe(' AND (facet1:value 1) AND (facet2:value 3)');
  });
});
