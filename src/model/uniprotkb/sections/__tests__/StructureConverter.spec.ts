import convertStructure from '../StructureConverter';
import modelData from '../../../__mocks__/entryModelData.json';

describe('Structure data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertStructure(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map(),
      xrefData: [],
      featuresData: [],
      keywordData: [],
      structures: new Map(),
    });
  });
});
