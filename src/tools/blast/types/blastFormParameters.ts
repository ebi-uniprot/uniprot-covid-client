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
  Sequence,
  TaxIDs,
} from './blastServerParameters';

export type FormParameters = {
  stype: SType;
  program: Program;
  sequence: Sequence;
  database: Database;
  taxIDs: TaxIDs;
  threshold: Exp;
  matrix: Matrix;
  filter: Filter;
  gapped: GapAlign;
  hits: Scores | Alignments;
};
