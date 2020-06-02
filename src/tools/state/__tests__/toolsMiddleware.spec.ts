import { schedule, sleep } from 'timing-functions';
import { action } from 'typesafe-actions';
import postData from '../../../uniprotkb/config/postData';

import toolsMiddleware from '../toolsMiddleware';
import createdJob from '../../blast/__mocks__/internal-jobs/created';
import JobStore from '../../utils/storage';
import { REHYDRATE_JOBS } from '../toolsActions';

jest.mock('timing-functions');

jest.mock('../../utils/storage', () => jest.fn());
jest.mock('../../../uniprotkb/config/postData', () =>
  Promise.resolve({ data: 'some-id' })
);

const next = jest.fn();
const store = {
  dispatch: jest.fn(),
  getState: () => ({
    tools: {
      job1: createdJob,
    },
  }),
};

describe('toolsMiddleware', () => {
  it('should run with new jobs', () => {
    const action = {
      type: REHYDRATE_JOBS,
    };
    toolsMiddleware(store)(next)(action);
    // expect(store.dispatch).toHaveBeenCalled();
  });
});
