import { convertInteraction } from '../InteractionConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Interaction data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertInteraction(modelData);
    expect(convertedData).toEqual({
      commentsData: [],
      xrefData: [],
    });
  });
});
