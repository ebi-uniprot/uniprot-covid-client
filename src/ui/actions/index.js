export const SELECT_FIELD = 'SELECT_FIELD';
export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const UPDATE_EVIDENCE = 'UPDATE_EVIDENCE';
export const UPDATE_RANGE_VALUE = 'UPDATE_RANGE_VALUE';
export const UPDATE_LOGIC_OPERATOR = 'UPDATE_LOGIC_OPERATOR';
export const HANDLE_FIELD_SELECT = 'HANDLE_FIELD_SELECT';
export const SUBMIT_QUERY = 'SUBMIT_QUERY';
export const ADD_CLAUSE = 'ADD_CLAUSE';
export const REMOVE_CLAUSE = 'REMOVE_CLAUSE';

export const selectField = (clauseId, field) => ({
  type: SELECT_FIELD,
  clauseId,
  field,
});

export const updateInputValue = (clauseId, value) => ({
  type: UPDATE_INPUT_VALUE,
  clauseId,
  value,
});

export const updateEvidence = (clauseId, fieldId, value) => ({
  type: UPDATE_EVIDENCE,
  clauseId,
  value,
});

export const updateRangeValue = (clauseId, fieldId, value, from) => ({
  type: UPDATE_RANGE_VALUE,
  clauseId,
  value,
  from,
});

export const updateLogicOperator = (clauseId, fieldId, value) => ({
  type: UPDATE_LOGIC_OPERATOR,
  fieldId,
  value,
});

export const submitQuery = () => ({
  type: SUBMIT_QUERY,
});

export const addClause = () => ({
  type: ADD_CLAUSE,
});

export const removeClause = clauseId => ({
  type: REMOVE_CLAUSE,
  clauseId,
});
