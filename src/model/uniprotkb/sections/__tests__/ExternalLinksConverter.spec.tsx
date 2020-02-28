import convertExternalLinks from '../ExternalLinksConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('External links data converter', () => {
  beforeAll(() => {
    modelData.databaseCrossReferences = convertXrefProperties(
      modelData.databaseCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertExternalLinks(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'WEB RESOURCE',
          [
            {
              commentType: 'WEB RESOURCE',
              ftp: true,
              note: 'Note text',
              resourceName: 'resource name',
              resourceUrl: 'resource URL',
            },
          ],
        ],
      ]),
      keywordData: [],
      featuresData: [],
      xrefData: [],
    });
  });
});
