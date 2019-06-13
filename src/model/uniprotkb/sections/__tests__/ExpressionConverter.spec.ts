import { convertExpression } from '../ExpressionConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Expression data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExpression(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([['TISSUE SPECIFICITY', []], ['INDUCTION', []]]),
      xrefData: [],
      featuresData: [],
      keywordData: [],
    });
  });
});
