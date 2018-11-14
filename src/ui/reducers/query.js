import {
  SELECT_FIELD,
  UPDATE_INPUT_VALUE,
  UPDATE_EVIDENCE,
  UPDATE_RANGE_VALUE,
  UPDATE_LOGIC_OPERATOR,
  SUBMIT_QUERY,
  ADD_CLAUSE,
  REMOVE_CLAUSE,
} from '../actions';
import { createEmptyClause } from '../utils';

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
    case UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        logicOperator: action.value,
      };  
    default:
      return state;
  }
};

const query = (state = [], action) => {
  switch (action.type) {
    case SELECT_FIELD:
    case UPDATE_INPUT_VALUE:
    case UPDATE_RANGE_VALUE:
    case UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        clauses: state.clauses.map(c => clause(c, action)),
      };
    case SUBMIT_QUERY:
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
    default:
      return state;
  }
};

export default query;
