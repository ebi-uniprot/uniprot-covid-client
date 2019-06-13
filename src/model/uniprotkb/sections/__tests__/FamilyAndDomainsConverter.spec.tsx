import { convertFamilyAndDomains } from '../FamilyAndDomainsConverter';
import modelDataJson from '../../../__mocks__/modelData.json';

describe('Family and Domains data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertFamilyAndDomains(modelDataJson);
    expect(convertedData).toEqual({
      commentsData: new Map([['DOMAIN', []], ['SIMILARITY', []]]),
      featuresData: [],
      keywordData: [
        {
          category: 'Domain',
          keywords: [
            {
              category: 'Domain',
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10025',
                  source: 'PROSITE-ProRule',
                },
              ],
              id: 'KW-11111',
              value: 'keyword value',
            },
          ],
        },
      ],
      xrefData: [],
    });
  });
});
