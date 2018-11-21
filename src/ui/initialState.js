import { createEmptyClause } from './utils';

const initialState = {
  query: {
    clauses: [...Array(4)].map(() => createEmptyClause()),
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
