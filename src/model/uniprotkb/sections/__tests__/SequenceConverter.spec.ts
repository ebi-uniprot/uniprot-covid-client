import { convertSequence } from '../SequenceConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Sequence data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertSequence(modelData);
    expect(convertedData).toEqual({
      alternativeProducts: {
        commentType: 'ALTERNATIVE PRODUCTS',
        events: ['Alternative initiation'],
        isoforms: [
          {
            isoformIds: ['isoID1'],
            isoformSequenceStatus: 'Described',
            name: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'name',
            },
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
            sequenceIds: ['SequenceID'],
            synonyms: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10028',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'syn value',
              },
            ],
            varSeqs: [],
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
      entryAudit: {
        entryVersion: 20,
        firstPublicDate: '2015-08-02',
        lastAnnotationUpdateDate: '2016-04-24',
        lastSequenceUpdateDate: '2017-01-21',
        sequenceVersion: 5,
      },
      featuresData: [],
      flag: 'Fragment',
      keywordData: [],
      lastUpdateDate: '2017-01-21 v5',
      massSpectrometry: [
        {
          commentType: 'MASS SPECTROMETRY',
          evidences: [
            { evidenceCode: 'ECO:0000256', id: 'PIRNR001361', source: 'PIRNR' },
          ],
          method: 'LSI',
          molWeight: 2.1,
          molWeightError: 1.2,
          molecule: 'isoform 1',
          note: 'note value',
        },
      ],
      molWeight: 1185,
      polymorphysm: [],
      processing: undefined,
      rnaEditing: [
        {
          commentType: 'RNA EDITING',
          locationType: 'Known',
          molecule: 'Isoform 2',
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
          positions: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000256',
                  id: 'PIRNR001361',
                  source: 'PIRNR',
                },
              ],
              position: 'rna position',
            },
          ],
        },
      ],
      sequence: {
        crc64: '3997D999CAB6C5A7',
        length: 10,
        md5: 'B1D4A86C222D0ED5500ABE909DD36218',
        molWeight: 1185,
        value: 'SAPSQDFMRF',
      },
      sequenceCaution: [
        {
          commentType: 'SEQUENCE CAUTION',
          evidences: [
            { evidenceCode: 'ECO:0000256', id: 'PIRNR001361', source: 'PIRNR' },
          ],
          molecule: 'Isoform 2',
          note: 'Text note',
          sequence: 'sequence',
          sequenceCautionType: 'Erroneous initiation',
        },
      ],
      status: 'Fragment',
      xrefData: [
        {
          category: 'GMA',
          databases: [
            {
              database: 'Ensembl',
              xrefs: [
                {
                  database: 'Ensembl',
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000269',
                      id: '11389730',
                      source: 'PubMed',
                    },
                  ],
                  id: 'id value',
                  isoformId: 'Q9NXB0-1',
                  properties: { ProteinId: 'description value' },
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
