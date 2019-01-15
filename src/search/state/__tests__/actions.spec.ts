import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@babel/polyfill';
import apiUrls from '../../../utils/apiUrls';
import * as actions from '../actions';
import initialState from '../initialState';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const dateNow = 1542736574043;
jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

describe('sync actions', () => {
  it('should create a SELECT_FIELD action', () => {
    const clauseId = '1';
    const field = 'foo';
    const expectedAction = {
      type: actions.SELECT_FIELD,
      clauseId,
      field,
    };
    expect(actions.selectField(clauseId, field)).toEqual(expectedAction);
  });

  it('should create a UPDATE_INPUT_VALUE action', () => {
    const clauseId = '1';
    const value = 'foo';
    const expectedAction = {
      type: actions.UPDATE_INPUT_VALUE,
      clauseId,
      value,
    };
    expect(actions.updateInputValue(clauseId, value)).toEqual(expectedAction);
  });

  it('should create a UPDATE_EVIDENCE action', () => {
    const clauseId = '1';
    const value = 'foo';
    const expectedAction = {
      type: actions.UPDATE_EVIDENCE,
      clauseId,
      value,
    };
    expect(actions.updateEvidence(clauseId, value)).toEqual(expectedAction);
  });

  it('should create a UPDATE_RANGE_VALUE action', () => {
    const clauseId = '1';
    const value = 'foo';
    const from = true;
    const expectedAction = {
      type: actions.UPDATE_RANGE_VALUE,
      clauseId,
      value,
      from,
    };
    expect(actions.updateRangeValue(clauseId, value, from)).toEqual(expectedAction);
  });

  it('should create a UPDATE_LOGIC_OPERATOR action', () => {
    const clauseId = '1';
    const value = 'foo';
    const expectedAction = {
      type: actions.UPDATE_LOGIC_OPERATOR,
      clauseId,
      value,
    };
    expect(actions.updateLogicOperator(clauseId, value)).toEqual(expectedAction);
  });

  it('should create an UPDATE_QUERY_STRING action', () => {
    const queryString = 'blah';
    const expectedAction = {
      type: actions.UPDATE_QUERY_STRING,
      queryString,
    };
    expect(actions.updateQueryString(queryString)).toEqual(expectedAction);
  });

  it('should create a ADD_CLAUSE action', () => {
    const expectedAction = {
      type: actions.ADD_CLAUSE,
    };
    expect(actions.addClause()).toEqual(expectedAction);
  });

  it('should create a REMOVE_CLAUSE action', () => {
    const clauseId = '1';
    const expectedAction = {
      type: actions.REMOVE_CLAUSE,
      clauseId,
    };
    expect(actions.removeClause(clauseId)).toEqual(expectedAction);
  });

  it('should create a REQUEST_SEARCH_TERMS action', () => {
    const expectedAction = {
      type: actions.REQUEST_SEARCH_TERMS,
    };
    expect(actions.requestSearchTerms()).toEqual(expectedAction);
  });

  it('should return true if evidences is not fetching ', () => {
    const state = mockStore(initialState).getState();
    state.query.evidences.go.isFetching = false;
    expect(actions.shouldFetchEvidences(state, 'go')).toEqual(true);
    state.query.evidences.go.isFetching = true;
    expect(actions.shouldFetchEvidences(state, 'go')).toEqual(false);
  });

  it('should create a REQUEST_EVIDENCES action', () => {
    const expectedAction = {
      type: actions.REQUEST_EVIDENCES,
    };
    expect(actions.requestEvidences()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  it('creates RECEIVE_SEARCH_TERMS when fetching has been done', () => {
    const data = [{ id: '1', label: 'foo' }, { id: '2', label: 'bar' }];
    mock.onGet(apiUrls.advanced_search_terms).reply(200, data);
    const expectedActions = [
      { type: actions.REQUEST_SEARCH_TERMS },
      { type: actions.RECEIVE_SEARCH_TERMS, receivedAt: dateNow, data },
    ];
    const store = mockStore(initialState);
    return store.dispatch(actions.fetchSearchTerms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_EVIDENCES when fetching has been done', () => {
    const data = [
      {
        groupName: 'Any',
        items: [
          {
            name: 'Any assertion method',
            code: 'any',
          },
          {
            name: 'Any manual assertion',
            code: 'manual',
          },
          {
            name: 'Any automatic assertion',
            code: 'automatic',
          },
        ],
      },
    ];
    mock.onGet(apiUrls.evidences.go).reply(200, data);
    const expectedActions = [
      { type: actions.REQUEST_EVIDENCES, evidencesType: 'go' },
      {
        type: actions.RECEIVE_EVIDENCES,
        receivedAt: dateNow,
        evidencesType: 'go',
        data,
      },
    ];
    const store = mockStore(initialState);
    return store.dispatch(actions.fetchEvidences('go')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
