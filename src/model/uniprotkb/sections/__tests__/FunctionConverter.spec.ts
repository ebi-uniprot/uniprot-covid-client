import { convertFunction } from '../FunctionConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Function data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertFunction(modelData);
    expect(convertedData).toEqual({
      catalyticActivityData: [
        {
          commentType: 'CATALYTIC ACTIVITY',
          physiologicalReactions: [
            {
              directionType: 'right-to-left',
              evidences: [
                {
                  evidenceCode: 'ECO:0000313',
                  id: 'ENSP0001324',
                  source: 'Ensembl',
                },
              ],
              reactionReference: { databaseType: 'Rhea', id: 'RHEA:313' },
            },
          ],
          reaction: {
            ecNumber: '1.2.4.5',
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                id: 'PIRNR001361',
                source: 'PIRNR',
              },
            ],
            name: 'some reaction',
            reactionReferences: [{ databaseType: 'ChEBI', id: 'ChEBI:3243' }],
          },
        },
      ],
      miscellaneousData: [],
      featuresData: [],
      functionCommentsData: [],
      keywordData: [],
      pathwayCommentsData: [],
      xrefData: [],
    });
  });
});
