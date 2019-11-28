import convertFunction from '../FunctionConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Function data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertFunction(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        ['FUNCTION', []],
        ['PATHWAY', []],
        ['MISCELLANEOUS', []],
        [
          'CATALYTIC ACTIVITY',
          [
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
                reactionReferences: [
                  { databaseType: 'ChEBI', id: 'ChEBI:3243' },
                ],
              },
            },
          ],
        ],
        [
          'BIOPHYSICOCHEMICAL PROPERTIES',
          [
            {
              absorption: {
                approximate: true,
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10028',
                    source: 'PROSITE-ProRule',
                  },
                ],
                max: 10,
                note: {
                  texts: [
                    {
                      evidences: [
                        {
                          evidenceCode: 'ECO:0000255',
                          id: 'PRU10028',
                          source: 'PROSITE-ProRule',
                        },
                      ],
                      value: 'value1',
                    },
                  ],
                },
              },
              commentType: 'BIOPHYSICOCHEMICAL PROPERTIES',
              kineticParameters: {
                maximumVelocities: [
                  {
                    enzyme: 'enzyme1',
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    unit: 'unit1',
                    velocity: 1,
                  },
                ],
                michaelisConstants: [
                  {
                    constant: 2.0999999046325684,
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    substrate: 'sub1',
                    unit: 'uM',
                  },
                ],
                note: {
                  texts: [
                    {
                      evidences: [
                        {
                          evidenceCode: 'ECO:0000255',
                          id: 'PRU10028',
                          source: 'PROSITE-ProRule',
                        },
                      ],
                      value: 'value1',
                    },
                  ],
                },
              },
              phDependence: {
                texts: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: 'value1',
                  },
                ],
              },
              redoxPotential: {
                texts: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: 'value1',
                  },
                ],
              },
              temperatureDependence: {
                texts: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: 'value1',
                  },
                ],
              },
            },
          ],
        ],
      ]),
      bioPhysicoChemicalProperties: {
        absorption: {
          approximate: true,
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10028',
              source: 'PROSITE-ProRule',
            },
          ],
          max: 10,
          note: {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10028',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'value1',
              },
            ],
          },
        },
        kinetics: {
          maximumVelocities: [
            {
              enzyme: 'enzyme1',
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              unit: 'unit1',
              velocity: 1,
            },
          ],
          michaelisConstants: [
            {
              constant: 2.0999999046325684,
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              substrate: 'sub1',
              unit: 'uM',
            },
          ],
          note: {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10028',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'value1',
              },
            ],
          },
        },
        pHDependence: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10028',
                source: 'PROSITE-ProRule',
              },
            ],
            value: 'value1',
          },
        ],
        redoxPotential: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10028',
                source: 'PROSITE-ProRule',
              },
            ],
            value: 'value1',
          },
        ],
        temperatureDependence: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10028',
                source: 'PROSITE-ProRule',
              },
            ],
            value: 'value1',
          },
        ],
      },
      featuresData: [],
      keywordData: [],
      xrefData: [],
    });
  });
});
