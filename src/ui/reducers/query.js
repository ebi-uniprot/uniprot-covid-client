import {
  SELECT_FIELD,
  UPDATE_INPUT_VALUE,
  UPDATE_EVIDENCE,
  UPDATE_RANGE_VALUE,
  UPDATE_LOGIC_OPERATOR,
  SUBMIT_QUERY,
  ADD_CLAUSE,
  REMOVE_CLAUSE,
  REQUEST_SEARCH_TERMS,
  RECEIVE_SEARCH_TERMS,
  REQUEST_EVIDENCES,
  RECEIVE_EVIDENCES,
} from '../actions';
import {
  createEmptyClause,
  createQueryString,
} from '../utils';

const clause = (state, action) => {
  if (state.id !== action.clauseId) {
    return state;
  }
  switch (action.type) {
    case SELECT_FIELD:
      return {
        ...state,
        field: action.field,
      };
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        queryInput: { stringValue: action.value },
      };
    case UPDATE_RANGE_VALUE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          [action.from ? 'rangeFrom' : 'rangeTo']: action.value,
        },
      };
    case UPDATE_EVIDENCE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          evidenceValue: action.value,
        },
      };
    case UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        logicOperator: action.value,
      };  
    default:
      return state;
  }
};

const searchTerms = (state = [], action) => {
  switch (action.type) {
    case REQUEST_SEARCH_TERMS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_SEARCH_TERMS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const evidences = (state = [], action) => {
  switch (action.type) {
    case REQUEST_EVIDENCES:
      return {
        ...state,
        [action.evidencesType]: {
          isFetching: true,
        },
      };
    case RECEIVE_EVIDENCES:
      return {
        ...state,
        [action.evidencesType]: {
          isFetching: false,
          data: action.data,
          lastUpdated: action.receivedAt,
        },
      };
    default:
      return state;
  }
}

const query = (state = [], action) => {
  switch (action.type) {
    case SELECT_FIELD:
    case UPDATE_INPUT_VALUE:
    case UPDATE_RANGE_VALUE:
    case UPDATE_EVIDENCE:
    case UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        clauses: state.clauses.map(c => clause(c, action)),
      };
    case SUBMIT_QUERY:
      console.log(createQueryString(state.clauses));
      return state;
    case ADD_CLAUSE:
      return {
        ...state,
        clauses: [...state.clauses, createEmptyClause()],
      };
    case REMOVE_CLAUSE:
      if (state.clauses.length === 1) {
        return {
          ...state,
          clauses: [createEmptyClause()],
        };
      }
      return {
        ...state,
        clauses: state.clauses.filter(c => c.id !== action.clauseId),
      };
    case REQUEST_SEARCH_TERMS:
    case RECEIVE_SEARCH_TERMS:
      return {
        ...state,
        searchTerms: searchTerms(state.searchTerms, action),
      };
    case REQUEST_EVIDENCES:
    case RECEIVE_EVIDENCES:
    case UPDATE_EVIDENCE:
      return {
        ...state,
        evidences: evidences(state.evidences, action),
      };
    default:
      return state;
  }
};

export default query;
