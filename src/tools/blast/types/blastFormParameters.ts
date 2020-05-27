import {
  SType,
  Database,
  Exp,
  Matrix,
  Filter,
  GapAlign,
  Scores,
  Alignments,
  Program,
} from './blastServerParameters';

export type FormParameters = {
  stype: SType;
  program: Program;
  sequence: string;
  database: Database;
  taxIDs: string;
  threshold: Exp;
  matrix: Matrix;
  filter: Filter;
  gapped: GapAlign;
  hits: Scores | Alignments;
};
