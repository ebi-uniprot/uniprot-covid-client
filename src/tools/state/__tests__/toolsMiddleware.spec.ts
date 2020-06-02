import toolsMiddleware from '../toolsMiddleware';
import { action } from 'typesafe-actions';
import JobStore from '../../utils/storage';

jest.mock('../../utils/storage', () => jest.fn());

const next = jest.fn();
const store = jest.fn();

test('toolsMiddleware', () => {
  const action = { type: 'REHYDRATE_JOBS', payload: { your: 'data' } };
  toolsMiddleware(store)(next)(action);
});
