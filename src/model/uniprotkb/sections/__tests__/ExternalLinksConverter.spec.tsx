import convertExternalLinks from '../ExternalLinksConverter';
import modelDataJson from '../../../__mocks__/modelData.json';

describe('External links data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExternalLinks(modelDataJson);
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
