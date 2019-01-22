import { createEmptyClause } from '../utils/clause';
import { Clause, Namespace } from '../types/searchTypes';

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
