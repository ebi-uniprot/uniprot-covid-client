import { createEmptyClause } from '../utils/clause';
import {
  Clause,
  Namespace,
  Evidence,
  Evidences,
  SearchTermType,
} from '../types/searchTypes';

const DEFAULT_CLAUSE_COUNT = 4;

export type SearchState = {
  readonly clauses: Clause[];
  readonly queryString: string;
  readonly namespace: Namespace;
  readonly searchTerms: { data: SearchTermType[] };
  readonly evidences: Evidences;
};

const searchInitialState: SearchState = {
  clauses: [...Array(DEFAULT_CLAUSE_COUNT)].map(() => createEmptyClause()),
  queryString: '',
  namespace: Namespace.uniprotkb,
  searchTerms: {
    data: [],
  },
  evidences: {
    [Evidence.GO]: {
      data: [],
      isFetching: false,
    },
    [Evidence.ANNOTATION]: {
      data: [],
      isFetching: false,
    },
  },
};

export default searchInitialState;
