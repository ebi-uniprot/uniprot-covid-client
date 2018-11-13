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
import createEmptyField from '../utils';

const clause = (state, action) => {
  switch (action.type) {
    case SELECT_FIELD:
      if (state.id !== action.clauseId) {
        return state;
      }
      return {
        ...state,
        field: action.field,
      };
    case UPDATE_INPUT_VALUE:
      if (state.id !== action.clauseId) {
        return state;
      }
      return {
        ...state,
        queryInput: action.value,
      };
    case UPDATE_LOGIC_OPERATOR:
      if (state.id !== action.clauseId) {
        return state;
      }

      return {
        ...state,
        logicalOperator: action.logicalOperator,
      };
    default:
      return state;
  }
};

const query = (state = [], action) => {
  switch (action.type) {
    case SELECT_FIELD:
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        clauses: state.clauses.map(f => clause(f, action)),
      };
    case SUBMIT_QUERY:
      return state;
    case ADD_CLAUSE:
      return {
        ...state,
        clauses: [...state.clauses, createEmptyField()],
      };
    case REMOVE_CLAUSE:
      if (state.clauses.length === 1) {
        return {
          ...state,
          clauses: [createEmptyField()],
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
