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
        value: action.value,
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
  console.log(state);
  console.log(action);
  switch (action.type) {
    case SELECT_FIELD:
      return {
        ...state,
        clauses: state.clauses.map(f => clause(f, action)),
      };
    case SUBMIT_QUERY:
      console.log('SUBMIT_QUERY');
      return state;
    case ADD_CLAUSE:
      console.log(ADD_CLAUSE);
      return state;
    case REMOVE_CLAUSE:
      if (state.clauses.length === 1) {
        return state;
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
