import {
  UPDATE_FIELD,
  UPDATE_VALUE,
  UPDATE_LOGICAL_OPERATOR,
} from '../constants/ActionTypes';

const filter = (state, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        clause: action.clause,
      };
    case UPDATE_VALUE:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        value: action.value,
      };
    case UPDATE_LOGICAL_OPERATOR:
      if (state.id !== action.id) {
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
    case UPDATE_FIELD:
    case UPDATE_VALUE:
    case UPDATE_LOGICAL_OPERATOR:
      return state.map(f => filter(f, action));
    default:
      return state;
  }
}

export default query;
