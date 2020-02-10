import convertStructure from '../StructureConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Structure data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertStructure(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map(),
      xrefData: [
        {
          category: '3DS',
          databases: [
            {
              database: 'SWISS-MODEL-Workspace',
              xrefs: [
                {
                  databaseType: 'SWISS-MODEL-Workspace',
                  implicit: true,
                  properties: [{ key: 'GeneName', value: 'some Gene' }],
                },
              ],
            },
            {
              database: 'ModBase',
              xrefs: [{ databaseType: 'ModBase', implicit: true }],
            },
          ],
        },
      ],
      featuresData: [],
      keywordData: [],
      structures: new Map(),
    });
  });
});
