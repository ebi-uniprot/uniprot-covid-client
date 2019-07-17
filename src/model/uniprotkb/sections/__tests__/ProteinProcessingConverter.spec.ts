import convertProteinProcessing from '../ProteinProcessingConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Protein processing data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertProteinProcessing(modelData);
    expect(convertedData).toEqual({
      featuresData: [
        {
          alternativeSequence: {
            alternativeSequences: ['alternative value'],
            originalSequence: 'original value',
          },
          dbXref: { databaseType: 'dbSNP', id: 'db id' },
          description: 'description value',
          evidences: [
            { evidenceCode: 'ECO:0000269', id: '11389730', source: 'PubMed' },
          ],
          featureId: 'id value',
          location: {
            end: { modifier: 'EXACT', value: 8 },
            start: { modifier: 'EXACT', value: 2 },
          },
          type: 'chain',
        },
      ],
      commentsData: new Map([['PTM', []]]),
      xrefData: [],
      keywordData: [],
    });
  });
});
