import { createPreSelectedClauses } from '../utils/clause';
import {
  Clause,
  Namespace,
  Evidence,
  Evidences,
  SearchTermType,
} from '../types/searchTypes';

export type SearchState = {
  readonly clauses: Clause[];
  readonly queryString: string;
  readonly namespace: Namespace;
  readonly searchTerms: { data: SearchTermType[]; isFetching: boolean };
  readonly evidences: Evidences;
};

const searchInitialState: SearchState = {
  clauses: createPreSelectedClauses(),
  queryString: '',
  namespace: Namespace.uniprotkb,
  searchTerms: {
    data: [],
    isFetching: false,
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
