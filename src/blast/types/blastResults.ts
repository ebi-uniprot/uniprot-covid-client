export type BlastHit = {
  hit_num: number;
  hit_def: string;
  hit_db: string;
  hit_id: string;
  hit_acc: string;
  hit_desc: string;
  hit_url: string;
  hit_len: number;
  hit_hsps: {
    hsp_num: number;
    hsp_score: number;
    hsp_bit_score: number;
    hsp_expect: number;
    hsp_identity: number;
    hsp_positive: number;
    hsp_gaps: number;
    hsp_strand: string;
    hsp_query_from: number;
    hsp_query_to: number;
    hsp_hit_from: number;
    hsp_hit_to: number;
    hsp_qseq: string;
    hsp_mseq: string;
    hsp_hseq: string;
  }[];
};

export type BlastResults = {
  program: string;
  version: string;
  command: string;
  query_def: string;
  query_stype: string;
  query_len: number;
  db_count: number;
  db_num: number;
  db_len: number;
  dbs: {
    name: string;
    stype: string;
    created: string;
  }[];
  expect_upper: number;
  filter: string;
  gap_extend: number;
  gap_open: number;
  matrix: string;
  start: string;
  end: string;
  search: string;
  hits: BlastHit[];
};
