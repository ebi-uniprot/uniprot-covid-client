import convertSubcellularLocation from '../subcellularLocationConverter';
import modelData from '../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../adapters/uniProtkbConverter';

describe('Subcellular data converter', () => {
  beforeAll(() => {
<<<<<<< HEAD:src/model/uniprotkb/sections/__tests__/SubcellularLocationConverter.spec.ts
    modelDataJson.uniProtKBCrossReferences = convertXrefProperties(
      modelDataJson.uniProtKBCrossReferences
=======
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
>>>>>>> uniprot/2020_05__better_fetch_and_sequences:src/uniprotkb/adapters/__tests__/subcellularLocationConverter.spec.ts
    );
  });

  test('should convert the data', () => {
    const convertedData = convertSubcellularLocation(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'SUBCELLULAR LOCATION',
          [
            {
              commentType: 'SUBCELLULAR LOCATION',
              molecule: 'molecule value',
              note: {
                texts: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    value: 'value',
                  },
                ],
              },
              subcellularLocations: [
                {
                  location: {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    id: 'id1',
                    value: 'location value',
                  },
                  orientation: {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    id: 'id2',
                    value: 'orientation value',
                  },
                  topology: {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    id: 'id2',
                    value: 'topology value',
                  },
                },
              ],
            },
          ],
        ],
      ]),
      featuresData: [],
      keywordData: [],
      xrefData: [],
    });
  });
});
