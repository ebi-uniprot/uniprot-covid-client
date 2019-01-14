import { createEmptyClause } from '../utils/clause';
import { Clause, Namespace } from '../types/searchTypes';

export interface SearchState {
  readonly clauses: Array<Clause>;
  readonly queryString: string;
  readonly namespace: Namespace;
  readonly searchTerms: any;
  readonly evidences: {
    readonly go: any;
    readonly annotation: any;
  };
}

const initialState = {
  clauses: [...Array(2)].map(() => createEmptyClause()),
  queryString: '',
  namespace: Namespace.UniProtKB,
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

export default initialState;
