import { ActionType } from 'typesafe-actions';
import * as searchActions from './actions';
import { createEmptyClause } from '../utils/clause';
import { createQueryString } from '../utils/QueryStringGenerator';
import initialState, { SearchState } from './initialState';
import { Clause, EvidenceType } from '../types/searchTypes';

export type SearchActions = ActionType<typeof searchActions>;

export const clause = (state: Clause, action: SearchActions) => {
  if (state.id !== action.payload.clauseId) {
    return state;
  }
  switch (action.type) {
    case searchActions.SELECT_FIELD:
      return {
        ...state,
        field: action.payload.field,
        queryInput: {},
      };
    case searchActions.UPDATE_INPUT_VALUE:
      return {
        ...state,
        queryInput: { ...state.queryInput, stringValue: action.payload.value },
      };
    case searchActions.UPDATE_RANGE_VALUE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          [action.payload.from ? 'rangeFrom' : 'rangeTo']: action.payload.value,
        },
      };
    case searchActions.UPDATE_EVIDENCE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          evidenceValue: action.payload.value,
        },
      };
    case searchActions.UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        logicOperator: action.payload.value,
      };
    default:
      return state;
  }
};

export const searchTerms = (state: SearchState['searchTerms'], action: SearchActions) => {
  switch (action.type) {
    case searchActions.REQUEST_SEARCH_TERMS:
      return {
        ...state,
        isFetching: true,
      };
    case searchActions.RECEIVE_SEARCH_TERMS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        lastUpdated: action.payload.receivedAt,
      };
    default:
      return state;
  }
};

export const evidences = (state: SearchState['evidences'], action: SearchActions) => {
  switch (action.type) {
    case searchActions.REQUEST_EVIDENCES:
      return {
        ...state,
        [action.payload.evidencesType]: {
          ...state[action.payload.evidencesType],
          isFetching: true,
        },
      };
    case searchActions.RECEIVE_EVIDENCES:
      return {
        ...state,
        [action.payload.evidencesType]: {
          isFetching: false,
          data: action.payload.data,
          lastUpdated: action.payload.receivedAt,
        },
      };
    default:
      return state;
  }
};

const query = (state: SearchState = initialState, action: SearchActions) => {
  switch (action.type) {
    case searchActions.SELECT_FIELD:
    case searchActions.UPDATE_INPUT_VALUE:
    case searchActions.UPDATE_RANGE_VALUE:
    case searchActions.UPDATE_EVIDENCE:
    case searchActions.UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        clauses: state.clauses.map(c => clause(c, action)),
      };
    case searchActions.SUBMIT_ADVANCED_QUERY:
      return {
        ...state,
        queryString: createQueryString(state.clauses),
      };
    case searchActions.ADD_CLAUSE:
      return {
        ...state,
        clauses: [...state.clauses, createEmptyClause()],
      };
    case searchActions.REMOVE_CLAUSE:
      if (state.clauses.length === 1) {
        return {
          ...state,
          clauses: [createEmptyClause()],
        };
      }
      return {
        ...state,
        clauses: state.clauses.filter(c => c.id !== action.payload.clauseId),
      };
    case searchActions.UPDATE_CLAUSES:
      return {
        ...state,
        clauses: action.payload.clauses,
      };
    case searchActions.REQUEST_SEARCH_TERMS:
    case searchActions.RECEIVE_SEARCH_TERMS:
      return {
        ...state,
        searchTerms: searchTerms(state.searchTerms, action),
      };
    case searchActions.REQUEST_EVIDENCES:
    case searchActions.RECEIVE_EVIDENCES:
      return {
        ...state,
        evidences: evidences(state.evidences, action),
      };
    default:
      return state;
  }
};

export default query;
