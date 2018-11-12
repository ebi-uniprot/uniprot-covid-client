export const SELECT_FIELD = 'SELECT_FIELD';
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CHANGE_EVIDENCE = 'CHANGE_EVIDENCE';
export const CHANGE_RANGE_VALUE = 'CHANGE_RANGE_VALUE';
export const CHANGE_LOGIC_OPERATOR = 'CHANGE_LOGIC_OPERATOR';
export const HANDLE_FIELD_SELECT = 'HANDLE_FIELD_SELECT';
export const SUBMIT_QUERY = 'SUBMIT_QUERY';
export const ADD_CLAUSE = 'ADD_CLAUSE';

export const selectField = (clauseId, fieldId, value) => ({
  type: SELECT_FIELD,
  fieldId,
  value,
});

export const changeInputValue = (clauseId, fieldId, value) => ({
  type: CHANGE_INPUT_VALUE,
  fieldId,
  value,
});

export const changeEvidence = (clauseId, fieldId, value) => ({
  type: CHANGE_EVIDENCE,
  fieldId,
  value,
});

export const changeRangeValue = (clauseId, fieldId, value, from) => ({
  type: CHANGE_RANGE_VALUE,
  fieldId,
  value,
  from,
});

export const changeLogicOperator = (clauseId, fieldId, value) => ({
  type: CHANGE_LOGIC_OPERATOR,
  fieldId,
  value,
});

export const submitQuery = () => ({
  type: SUBMIT_QUERY,
});

export const addClause = () => ({
  type: ADD_CLAUSE,
});
