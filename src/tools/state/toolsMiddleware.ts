import { Middleware } from 'redux';
import { RootState } from '../../app/state/rootInitialState';

import { CREATE_JOB, UPDATE_JOB, updateJob } from './toolsActions';
import fetchData from '../../shared/utils/fetchData';
import blastUrls from '../blast/config/blastUrls';

const toolsMiddleware: Middleware = (store) => (next) => (action) => {
  function* pollForBlastStatus(jobId: string) {
    while (true) {
      yield fetchData(blastUrls.statusUrl(jobId), {
        headers: {
          Accept: 'text/plain',
        },
      }).then((response) => {
        return response.data;
      });
    }
  }

  const runPolling = (
    jobId: string,
    generator?: IterableIterator<Promise<string>>
  ) => () => {
    if (!generator) {
      // eslint-disable-next-line no-param-reassign
      generator = pollForBlastStatus(jobId);
    }

    const p = generator.next();
    p.value.then((d: string) => {
      if (d === 'RUNNING') {
        setTimeout(() => runPolling(jobId, generator), 3000);
      } else {
        // Job has finished running
        updateJob(job);
      }
    });
  };

  // eslint-disable-next-line default-case
  switch (action.type) {
    case CREATE_JOB:
      const state = store.getState();
    // TODO add the new job to the state
  }
  return next(action);
};

export default toolsMiddleware;
