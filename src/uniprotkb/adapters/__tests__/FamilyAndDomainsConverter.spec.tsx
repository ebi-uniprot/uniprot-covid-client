import convertFamilyAndDomains from '../FamilyAndDomainsConverter';
import modelData from '../../__mockData__/entryModelData.json';
import { convertXrefProperties } from '../../adapters/UniProtkbConverter';

describe('Family and Domains data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertFamilyAndDomains(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        ['DOMAIN', []],
        ['SIMILARITY', []],
      ]),
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
              name: 'keyword value',
            },
          ],
        },
      ],
      xrefData: [
        {
          category: 'FMD',
          databases: [
            {
              database: 'MobiDB',
              xrefs: [{ database: 'MobiDB', implicit: true }],
            },
            {
              database: 'ProtoNet',
              xrefs: [{ database: 'ProtoNet', implicit: true }],
            },
          ],
        },
      ],
    });
  });
});
