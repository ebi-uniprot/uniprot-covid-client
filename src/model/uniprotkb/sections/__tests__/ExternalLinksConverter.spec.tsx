import convertExternalLinks from '../ExternalLinksConverter';
import modelDataJson from '../../../__mocks__/modelData.json';

describe('External links data converter', () => {
  test('should convert the data', () => {
    const convertedData = JSON.parse(
      JSON.stringify(convertExternalLinks(modelDataJson))
    );
    expect(convertedData).toEqual({
      commentsData: {},
      keywordData: [],
      featuresData: [],
      xrefData: [
        {
          category: 'GMA',
          databases: [
            {
              database: 'Ensembl',
              xrefs: [
                {
                  databaseType: 'Ensembl',
                  id: 'id value',
                  properties: [
                    {
                      key: 'ProteinId',
                      value: 'description value',
                    },
                  ],
                  isoformId: 'Q9NXB0-1',
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000269',
                      source: 'PubMed',
                      id: '11389730',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
