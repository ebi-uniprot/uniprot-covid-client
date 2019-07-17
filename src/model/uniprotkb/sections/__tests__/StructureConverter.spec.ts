import convertStructure from '../StructureConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Structure data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertStructure(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map(),
      xrefData: [],
      featuresData: [],
      keywordData: [],
    });
  });
});
