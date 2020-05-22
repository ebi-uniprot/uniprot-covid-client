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
import { ToolsState } from './toolsInitialState';

const POLLING_INTERVAL = 1000 * 3;

const toolsMiddleware: Middleware = (store) => {
  const { dispatch, getState } = store;

  const checkJobStatus = (job: Job) => {
    const url = job.type === 'blast' ? blastUrls.statusUrl(job.remoteId) : '';
    return fetchData(url, {
      headers: {
        Accept: 'text/plain',
      },
    }).then((response) => response.data);
  };

  const processJob = async (job: Job) => {
    if (job.status === Status.CREATED) {
      const status = await checkJobStatus(job);
      // TODO should we check what the status is before dispatching?
      dispatch(updateJob({ ...getState(), status: status }));
    }
  };

  const pollJobs = async () => {
    const state: ToolsState = getState();
    // Wait for browser idleness
    await new Promise((resolve) => window.requestIdleCallback(resolve));
    Object.values(state).forEach(async (job) => {
      await processJob(job);
    });
    setTimeout(pollJobs, POLLING_INTERVAL);
  };

  pollJobs();

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

  const fetchBlastResults = (job: Job) => {
    // TODO make request to fetch results
    const url = job.type === 'blast' ? blastUrls.resultUrl : '';
    // dispatch(updatedJob);
  };

  return (next) => (action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case CREATE_JOB:
        submitJob(job);
      // TODO add the new job to the store
    }
    return next(action);
  };
};

export default toolsMiddleware;
