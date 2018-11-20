import { clause } from '../../../src/ui/reducers/query';
import {
  selectField,
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
} from '../../../src/ui/actions';

describe('Clause reducer', () => {
  test('should select field', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
    };
    const action = selectField('1', 'baz');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'baz',
      queryInput: {},
    });
  });

  test('should update input value', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
    };
    const action = updateInputValue('1', 'qux');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'qux' },
    });
  });

  test('should update range input value', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { rangeFrom: 1, rangeTo: 100 },
    };
    const action = updateRangeValue('1', 2, true);
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { rangeFrom: 2, rangeTo: 100 },
    });
  });

  test('should update evidence', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar', evidenceValue: 'garply' },
    };
    const action = updateEvidence('1', 'waldo');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar', evidenceValue: 'waldo' },
    });
  });

  test('should update logic operator', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
      logicOperator: 'AND',
    };
    const action = updateLogicOperator('1', 'OR');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
      logicOperator: 'OR',
    });
  });
});
