import fetchData from '../../utils/fetchData';
import apiUrls from '../../utils/apiUrls';

export const SELECT_FIELD = 'SELECT_FIELD';
export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const UPDATE_EVIDENCE = 'UPDATE_EVIDENCE';
export const UPDATE_RANGE_VALUE = 'UPDATE_RANGE_VALUE';
export const UPDATE_LOGIC_OPERATOR = 'UPDATE_LOGIC_OPERATOR';
export const HANDLE_FIELD_SELECT = 'HANDLE_FIELD_SELECT';
export const UPDATE_QUERY_STRING = 'UPDATE_QUERY_STRING';
export const SUBMIT_ADVANCED_QUERY = 'SUBMIT_ADVANCED_QUERY';
export const ADD_CLAUSE = 'ADD_CLAUSE';
export const REMOVE_CLAUSE = 'REMOVE_CLAUSE';
export const REQUEST_SEARCH_TERMS = 'REQUEST_SEARCH_TERMS';
export const RECEIVE_SEARCH_TERMS = 'RECEIVE_SEARCH_TERMS';
export const REQUEST_EVIDENCES = 'REQUEST_EVIDENCES';
export const RECEIVE_EVIDENCES = 'RECEIVE_EVIDENCES';

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

export const updateEvidence = (clauseId, value) => ({
  type: UPDATE_EVIDENCE,
  clauseId,
  value,
});

export const updateRangeValue = (clauseId, value, from) => ({
  type: UPDATE_RANGE_VALUE,
  clauseId,
  value,
  from,
});

export const updateLogicOperator = (clauseId, value) => ({
  type: UPDATE_LOGIC_OPERATOR,
  clauseId,
  value,
});

export const updateQueryString = queryString => ({
  type: UPDATE_QUERY_STRING,
  queryString,
});

export const submitAdvancedQuery = () => ({
  type: SUBMIT_ADVANCED_QUERY,
});

export const addClause = () => ({
  type: ADD_CLAUSE,
});

export const removeClause = clauseId => ({
  type: REMOVE_CLAUSE,
  clauseId,
});

export const requestSearchTerms = () => ({
  type: REQUEST_SEARCH_TERMS,
});

export const receiveSearchTerms = data => ({
  type: RECEIVE_SEARCH_TERMS,
  data,
  receivedAt: Date.now(),
});

export const fetchSearchTerms = () => (dispatch) => {
  dispatch(requestSearchTerms());
  return fetchData(apiUrls.advanced_search_terms).then(response => dispatch(receiveSearchTerms(response.data)));
};

export const requestEvidences = evidencesType => ({
  type: REQUEST_EVIDENCES,
  evidencesType,
});

export const receiveEvidences = (data, evidencesType) => ({
  type: RECEIVE_EVIDENCES,
  data,
  evidencesType,
  receivedAt: Date.now(),
});

export const fetchEvidences = evidencesType => (dispatch) => {
  const url = apiUrls.evidences[evidencesType];
  dispatch(requestEvidences(evidencesType));
  return fetchData(url).then(response => dispatch(receiveEvidences(response.data, evidencesType)));
};

export const shouldFetchEvidences = (state, evidenceType) => {
  const evidences = state.query.evidences[evidenceType];
  return !evidences.isFetching;
};

export const fetchEvidencesIfNeeded = evidencesType => (dispatch, getState) => {
  if (shouldFetchEvidences(getState(), evidencesType)) {
    dispatch(fetchEvidences(evidencesType));
  }
};
