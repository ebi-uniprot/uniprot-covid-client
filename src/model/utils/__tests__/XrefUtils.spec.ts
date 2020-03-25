import {
  getDRImplicitXrefs,
  getDatabaseSimilarityCommentImplicitXrefs,
  getGenePatternOrganismImplicitXrefs,
  getECImplicitXrefs,
  getUnconditionalImplicitXrefs,
  getJoinedXrefs,
} from '../XrefUtils';
import { CommentType } from '../../types/CommentTypes';

describe('XrefUtils tests', () => {
  test('should getDRImplicitXrefs', () => {
    expect(
      getDRImplicitXrefs(
        [
          {
            databaseType: 'PDB',
            id: '1AMB',
            properties: { Method: 'NMR', Resolution: '-', Chains: 'A=672-699' },
          },
          {
            databaseType: 'MIM',
            id: '104300',
            properties: { Type: 'phenotype' },
          },
          {
            databaseType: 'HGNC',
            id: 'HGNC:620',
            properties: { GeneName: 'APP' },
          },
        ],
        ['APP', 'A4', 'AD1']
      )
    ).toEqual([
      {
        databaseType: 'PDBe-KB',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        databaseType: 'SOURCE_MIM',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        databaseType: 'GenAtlas',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        databaseType: 'SWISS-MODEL-Workspace',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
    ]);
  });

  test('should getDatabaseSimilarityCommentImplicitXrefs', () => {
    expect(
      getDatabaseSimilarityCommentImplicitXrefs('TS1R1_HUMAN', [
        {
          texts: [
            {
              value:
                'Belongs to the G-protein coupled receptor 3 family. TAS1R subfamily',
              evidences: [{ evidenceCode: 'ECO:0000305' }],
            },
          ],
          commentType: CommentType.SIMILARITY,
        },
      ])
    ).toEqual([
      {
        databaseType: 'GPCRDB',
        implicit: true,
        properties: { uniProtkbId: 'TS1R1_HUMAN' },
      },
    ]);
  });

  test('should getGenePatternOrganismImplicitXrefs', () => {
    expect(
      getGenePatternOrganismImplicitXrefs(['PNMA5', 'KIAA1934'], 'Human')
    ).toEqual([
      {
        databaseType: 'HUGE',
        implicit: true,
        properties: { gene: 'KIAA1934' },
      },
    ]);
  });

  test('should getECImplicitXrefs', () => {
    expect(getECImplicitXrefs([{ value: '3.1.4.4' }])).toEqual([
      {
        databaseType: 'ENZYME',
        implicit: true,
        properties: { ec: '3.1.4.4' },
      },
    ]);
  });
  test('should getUnconditionalImplicitXrefs', () => {
    expect(getUnconditionalImplicitXrefs()).toEqual([
      { databaseType: 'ModBase', implicit: true },
      { databaseType: 'MobiDB', implicit: true },
      { databaseType: 'ProtoNet', implicit: true },
    ]);
  });

  test('should getJoinedXrefs', () => {
    const xrefs = [
      {
        id: 'A',
        properties: {
          Status: 'SOMETHING',
          ProteinId: 'PROTEINA',
        },
      },
      {
        id: 'B',
        properties: {
          Status: 'JOINED',
          ProteinId: 'PROTEINA',
        },
      },
      {
        id: 'C',
        properties: {
          Status: 'JOINED',
          ProteinId: 'PROTEINA',
        },
      },
      {
        id: 'D',
        properties: {
          Status: 'SOMETHING ELSE',
          ProteinId: 'PROTEIND',
        },
      },
    ];
    const joined = getJoinedXrefs(xrefs);
    expect(joined).toEqual([
      {
        id: 'A',
        properties: {
          Status: 'SOMETHING',
          ProteinId: 'PROTEINA',
        },
        additionalIds: ['B', 'C'],
      },
      {
        id: 'D',
        properties: {
          Status: 'SOMETHING ELSE',
          ProteinId: 'PROTEIND',
        },
        additionalIds: [],
      },
    ]);
  });
});
