import {
  getDRImplicitXrefs,
  getDatabaseSimilarityCommentImplicitXrefs,
  getGenePatternOrganismImplicitXrefs,
  getECImplicitXrefs,
  getUnconditionalImplicitXrefs,
} from '../XrefUtils';
import { CommentType } from '../../types/CommentTypes';

describe('getDRImplicitXrefs', () => {
  test('should ', () => {
    expect(
      getDRImplicitXrefs(
        [
          {
            databaseType: 'PDB',
            id: '1AMB',
            properties: [
              { key: 'Method', value: 'NMR' },
              { key: 'Resolution', value: '-' },
              { key: 'Chains', value: 'A=672-699' },
            ],
          },
          {
            databaseType: 'MIM',
            id: '104300',
            properties: [{ key: 'Type', value: 'phenotype' }],
          },
          {
            databaseType: 'HGNC',
            id: 'HGNC:620',
            properties: [{ key: 'GeneName', value: 'APP' }],
          },
        ],
        ['APP', 'A4', 'AD1']
      )
    ).toEqual([
      {
        databaseType: 'PDBe-KB',
        implicit: true,
        properties: [{ key: 'GeneName', value: 'APP' }],
      },
      {
        databaseType: 'PDBj',
        implicit: true,
        properties: [{ key: 'GeneName', value: 'APP' }],
      },
      {
        databaseType: 'RCSB-PDB',
        implicit: true,
        properties: [{ key: 'GeneName', value: 'APP' }],
      },
      {
        databaseType: 'SOURCE_MIM',
        implicit: true,
        properties: [{ key: 'GeneName', value: 'APP' }],
      },
      {
        databaseType: 'GenAtlas',
        implicit: true,
        properties: [{ key: 'GeneName', value: 'APP' }],
      },
      {
        databaseType: 'SWISS-MODEL-Workspace',
        implicit: true,
        properties: [{ key: 'GeneName', value: 'APP' }],
      },
    ]);
  });
});

describe('getDatabaseSimilarityCommentImplicitXrefs', () => {
  test('should ', () => {
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
        properties: [{ key: 'uniProtId', value: 'TS1R1_HUMAN' }],
      },
    ]);
  });
});

describe('getGenePatternOrganismImplicitXrefs', () => {
  test('should ', () => {
    expect(
      getGenePatternOrganismImplicitXrefs(['PNMA5', 'KIAA1934'], 'Human')
    ).toEqual([
      {
        databaseType: 'HUGE',
        implicit: true,
        properties: [{ key: 'gene', value: 'KIAA1934' }],
      },
    ]);
  });
});

describe('getECImplicitXrefs', () => {
  test('should ', () => {
    expect(getECImplicitXrefs([{ value: '3.1.4.4' }])).toEqual([
      {
        databaseType: 'ENZYME',
        implicit: true,
        properties: [{ key: 'ec', value: '3.1.4.4' }],
      },
    ]);
  });
});

describe('getUnconditionalImplicitXrefs', () => {
  test('should ', () => {
    expect(getUnconditionalImplicitXrefs()).toEqual([
      { databaseType: 'ModBase', implicit: true },
      { databaseType: 'MobiDB', implicit: true },
      { databaseType: 'ProtoNet', implicit: true },
    ]);
  });
});
