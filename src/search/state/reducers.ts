import { ActionType, getType } from 'typesafe-actions';
import * as searchActions from './actions';
import { createEmptyClause } from '../utils/clause';
import createQueryString from '../utils/QueryStringGenerator';
import initialState, { SearchState } from './initialState';
import { Clause, EvidenceType } from '../types/searchTypes';

export type SearchActions = ActionType<typeof searchActions>;

export const clause = (state: Clause, action: SearchActions) => {
  if (state.id !== action.payload.clauseId) {
    return state;
  }
  switch (action.type) {
    case getType(searchActions.selectField):
      return {
        ...state,
        field: action.payload.field,
        queryInput: {},
      };
    case getType(searchActions.updateInputValue):
      return {
        ...state,
        queryInput: { ...state.queryInput, stringValue: action.payload.value },
      };
    case getType(searchActions.updateRangeValue):
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          [action.payload.from ? 'rangeFrom' : 'rangeTo']: action.payload.value,
        },
      };
    case getType(searchActions.updateEvidence):
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          evidenceValue: action.payload.value,
        },
      };
    case getType(searchActions.updateLogicOperator):
      return {
        ...state,
        logicOperator: action.payload.value,
      };
    default:
      return state;
  }
};

export const searchTerms = (state, action: SearchActions) => {
  switch (action.type) {
    case getType(searchActions.requestSearchTerms):
      return {
        ...state,
        isFetching: true,
      };
    case getType(searchActions.receiveSearchTerms):
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

export const evidences = (state, action: SearchActions) => {
  switch (action.type) {
    case getType(searchActions.requestEvidences):
      return {
        ...state,
        [action.payload.evidencesType]: {
          ...state[action.payload.evidencesType],
          isFetching: true,
        },
      };
    case getType(searchActions.receiveEvidences):
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
    case getType(searchActions.selectField):
    case getType(searchActions.updateInputValue):
    case getType(searchActions.updateRangeValue):
    case getType(searchActions.updateEvidence):
    case getType(searchActions.updateLogicOperator):
      return {
        ...state,
        clauses: state.clauses.map(c => clause(c, action)),
      };
    case getType(searchActions.updateQueryString):
      return {
        ...state,
        queryString: action.payload.queryString,
      };
    case getType(searchActions.submitAdvancedQuery):
      return {
        ...state,
        queryString: createQueryString(state.clauses),
      };
    case getType(searchActions.addClause):
      return {
        ...state,
        clauses: [...state.clauses, createEmptyClause()],
      };
    case getType(searchActions.removeClause):
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
    case getType(searchActions.requestSearchTerms):
    case getType(searchActions.receiveSearchTerms):
      return {
        ...state,
        searchTerms: searchTerms(state.searchTerms, action),
      };
    case getType(searchActions.requestEvidences):
    case getType(searchActions.receiveEvidences):
      return {
        ...state,
        evidences: evidences(state.evidences, action),
      };
    default:
      return state;
  }
};

export default query;
