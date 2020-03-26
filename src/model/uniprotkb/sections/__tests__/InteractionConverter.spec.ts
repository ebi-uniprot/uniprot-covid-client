import convertInteraction from '../InteractionConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Interaction data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertInteraction(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'INTERACTION',
          [
            {
              commentType: 'INTERACTION',
              interactions: [
                {
                  firstInteractor: 'first',
                  geneName: 'gene name',
                  numberOfExperiments: 10,
                  secondInteractor: 'second',
                  type: 'BINARY',
                  uniProtAccession: 'P12345',
                },
              ],
            },
          ],
        ],
        ['SUBUNIT', []],
      ]),
      xrefData: [],
      featuresData: [],
      keywordData: [],
    });
  });
});
