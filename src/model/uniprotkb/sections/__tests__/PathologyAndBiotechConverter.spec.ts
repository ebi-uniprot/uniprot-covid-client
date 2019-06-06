import { convertPathologyAndBiotech } from '../PathologyAndBiotechConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Pathology/Biotech data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertPathologyAndBiotech(modelData);
    expect(convertedData).toEqual({
      diseaseInvolvementData: [
        {
          commentType: 'DISEASE',
          disease: {
            acronym: 'someAcron',
            description: 'some description',
            diseaseAccession: 'Disease AC',
            diseaseId: 'Disease Id',
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                id: 'PIRNR001362',
                source: 'PIRNR',
              },
            ],
            reference: { databaseType: 'MIM', id: '3124' },
          },
          note: {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000256',
                    id: 'PIRNR001362',
                    source: 'PIRNR',
                  },
                ],
                value: 'value2',
              },
            ],
          },
        },
      ],
      featuresData: [],
      keywordData: [],
    });
  });
});
