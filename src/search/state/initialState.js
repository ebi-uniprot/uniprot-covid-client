import { createEmptyClause } from '../utils/clause';

const initialState = {
  query: {
    clauses: [...Array(2)].map(() => createEmptyClause()),
    queryString: '',
    namespace: 'UniProtKB',
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
  },
};

export default initialState;
