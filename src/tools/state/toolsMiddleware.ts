import { Middleware } from 'redux';

import {
  CREATE_JOB,
  updateJob,
  UPDATE_JOB,
  UPDATE_JOB_TITLE,
  DELETE_JOB,
} from './toolsActions';
import fetchData from '../../shared/utils/fetchData';
import blastUrls from '../blast/config/blastUrls';
import { Job, CreatedJob } from '../blast/types/blastJob';
import postData from '../../uniprotkb/config/postData';
import { Status } from '../blast/types/blastStatuses';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';
import { ToolsState } from './toolsInitialState';

const POLLING_INTERVAL = 1000 * 3; // 3 seconds

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

  const submitJob = (job: CreatedJob) => {
    const formData = new FormData();
    // specific logic to transform FormParameters to ServerParameters
    // (e.g. translating 'gapped' to 'gapaling', adding 'email')
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

  return (next) => (action) => {
    switch (action.type) {
      case CREATE_JOB:
        // schedule loop to submit CREATED jobs
        break;
      default:
      // do nothing
    }

    // state is not yet updated
    const returnValue = next(action);
    // state is now updated

    switch (action.type) {
      case CREATE_JOB:
      case UPDATE_JOB:
      case UPDATE_JOB_TITLE:
      case DELETE_JOB:
        // persist corresponding job from updated state into IndexedDB
        break;
      default:
      // do nothing
    }

    return returnValue;
  };
};

export default toolsMiddleware;
