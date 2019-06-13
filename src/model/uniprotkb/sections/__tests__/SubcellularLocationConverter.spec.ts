import { convertSubcellularLocation } from '../SubcellularLocationConverter';
import modelDataJson from '../../../__mocks__/modelData.json';

describe('Subcellular data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertSubcellularLocation(modelDataJson);
    expect(convertedData).toEqual({ keywordData: [], featuresData: [] });
  });
});
