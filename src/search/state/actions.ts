import { createAction, createAsyncAction, getType } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
import apiUrls from '../../utils/apiUrls';
import { FieldType, Operator, EvidenceType } from '../types/searchTypes';
import { RootState } from '../../state/initialState';

export const selectField = createAction(
  'search/select-field',
  resolve => (clauseId: string, field: FieldType) => resolve({ clauseId, field }),
);

export const updateInputValue = createAction(
  'search/update-input-value',
  resolve => (clauseId: string, value: string) => resolve({ clauseId, value }),
);

export const updateEvidence = createAction(
  'search/update-evidence',
  resolve => (clauseId: string, value: string) => resolve({ clauseId, value }),
);

export const updateRangeValue = createAction(
  'search/update-range-value',
  resolve => (clauseId: string, value: number, from: boolean) => resolve({ clauseId, value, from }),
);

export const updateLogicOperator = createAction(
  'search/update-logic-operator',
  resolve => (clauseId: string, value: Operator) => resolve({
    clauseId,
    value,
  }),
);

export const updateQueryString = createAction(
  'search/update-query-string',
  resolve => (queryString: string) => resolve({ queryString }),
);

export const submitAdvancedQuery = createAction('search/submit-advanced-query');

export const addClause = createAction('search/add-clause');

export const removeClause = createAction('search/removeClause', resolve => (clauseId: string) => resolve({ clauseId }));

export const requestSearchTerms = createAction('search/request-search-terms');

export const receiveSearchTerms = createAction(
  'search/receive-search-terms',
  resolve => (data: any) => resolve({ data, receivedAt: Date.now() }),
);

export const fetchSearchTerms = () => (dispatch: Dispatch) => {
  dispatch(requestSearchTerms());
  return fetchData(apiUrls.advanced_search_terms).then(response => dispatch(receiveSearchTerms(response.data)));
};

export const requestEvidences = createAction(
  'search/request-evidences',
  resolve => (evidencesType: EvidenceType) => resolve({ evidencesType }),
);

export const receiveEvidences = createAction(
  'search/receive-evidences',
  resolve => (data: any, evidencesType: EvidenceType) => resolve({ data, evidencesType, receivedAt: Date.now() }),
);

export const fetchEvidences = (evidencesType: EvidenceType) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  const url = apiUrls.evidences[evidencesType];
  dispatch(requestEvidences(evidencesType));
  return fetchData(url).then(response => dispatch(receiveEvidences(response.data, evidencesType)));
};

export const shouldFetchEvidences = (state: RootState, evidenceType: EvidenceType) => {
  const evidences = state.query.evidences[evidenceType];
  return !evidences.isFetching;
};

export const fetchEvidencesIfNeeded = async (evidencesType: EvidenceType) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  if (shouldFetchEvidences(getState(), evidencesType)) {
    dispatch(fetchEvidences(evidencesType));
  }
};
