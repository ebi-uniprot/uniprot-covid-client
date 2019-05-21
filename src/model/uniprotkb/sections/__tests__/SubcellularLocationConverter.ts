import { convertSubcellularLocation } from '../SubcellularLocationConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Subcellular data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertSubcellularLocation(modelData);
    expect(convertedData).toEqual({ keywordData: [] });
  });
});
