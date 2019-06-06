import { createEmptyClause } from '../utils/clause';
import { Clause, Namespace, EvidenceType } from '../types/searchTypes';

const DEFAULT_CLAUSE_COUNT = 4;

export type SearchState = {
  readonly clauses: Clause[];
  readonly queryString: string;
  readonly namespace: Namespace;
  readonly searchTerms: any;
  readonly evidences: {
    readonly go: any;
    readonly annotation: any;
  };
};

const searchInitialState = {
  clauses: [...Array(DEFAULT_CLAUSE_COUNT)].map(() => createEmptyClause()),
  queryString: '',
  namespace: Namespace.uniprotkb,
  searchTerms: {
    data: [],
  },
  evidences: {
    go: {
      data: [],
      isFetching: false,
    },
    annotation: {
      data: [],
      isFetching: false,
    },
  },
};

export default searchInitialState;
