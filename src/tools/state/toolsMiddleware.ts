import { Middleware } from 'redux';

import { CREATE_JOB, updateJob } from './toolsActions';
import fetchData from '../../shared/utils/fetchData';
import blastUrls from '../blast/config/blastUrls';
import { Job } from '../blast/types/blastJob';
import postData from '../../uniprotkb/config/postData';
import { Status } from '../blast/types/blastStatuses';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';

const toolsMiddleware: Middleware = (store) => {
  const { dispatch, getState } = store;
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

  const fetchBlastResults = (job: Job) => {
    // TODO make request to fetch results
    // dispatch(updatedJob);
  };

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
        // dispatch(fetchBlastResults);
      }
    });
  };

  const submitJob = (job: Job) => {
    const formData = new FormData();
    Object.keys(job.parameters).forEach((blastField) => {
      formData.append(blastField, job.parameters[blastField]);
    });
    const url = job.type === 'blast' ? blastUrls.runUrl : '';
    postData(url, {
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain',
      },
    })
      .then((response) => {
        const jobId = response.data;
        // TODO we should probably check that jobId is valid
        dispatch(
          updateJob({
            ...getState(),
            status: Status.RUNNING,
            remoteID: jobId,
            timeSubmitted: new Date(),
          })
        );
      })
      .catch((error) =>
        dispatch(
          addMessage({
            id: 'job-id',
            content: `Could not run job: ${error.message}`,
            format: MessageFormat.POP_UP,
            level: MessageLevel.FAILURE,
            tag: MessageTag.JOB,
          })
        )
      );
  };

  const processJob = (jobId: string) => {
    // TODO
  };

  return (next) => (action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case CREATE_JOB:
      // TODO add the new job to the state
    }
    return next(action);
  };
};

export default toolsMiddleware;
