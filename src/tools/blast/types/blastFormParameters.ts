import {
  SType,
  Database,
  Exp,
  Matrix,
  Filter,
  GapAlign,
  Scores,
  Alignments,
} from './blastServerParameters';

export type FormParameters = {
  type: SType;
  sequence: string;
  database: Database;
  taxIDs: string;
  threshold: Exp;
  matrix: Matrix;
  filter: Filter | 'mask'; // ? need to investigate what this maps to
  gapped: GapAlign;
  hits: Scores | Alignments;
};
