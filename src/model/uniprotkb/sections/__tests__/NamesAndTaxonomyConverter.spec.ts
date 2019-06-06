import { convertNamesAndTaxonomy } from '../NamesAndTaxonomyConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Names and taxonomy data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertNamesAndTaxonomy(modelData);
    expect(convertedData).toEqual({
      geneNamesData: {
        alternativeNames: ['some Syn', 'some orf'],
        name: 'some Gene',
      },
      organismData: {
        commonName: 'common name',
        evidences: [
          { evidenceCode: 'ECO:0000256', id: 'PIRNR001363', source: 'PIRNR' },
        ],
        lineage: ['lineage 1'],
        scientificName: 'scientific name',
        synonyms: ['synonyms 1'],
        taxonId: 9606,
      },
      proteinNamesData: {
        alternativeNames: ['1.2.3.4', 'sub full Name', 'a full alt Name'],
        recommendedName: 'rec full Name',
        shortNames: 'recommended short name',
      },
    });
  });
});
