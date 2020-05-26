import { Middleware } from 'redux';

import { Job, CreatedJob, RunningJob } from '../blast/types/blastJob';
import { Status } from '../blast/types/blastStatuses';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';
import { Stores } from '../utils/stores';

import { CREATE_JOB, updateJob, rehydrateJobs } from './toolsActions';

import fetchData from '../../shared/utils/fetchData';
import postData from '../../uniprotkb/config/postData';
import JobStore from '../utils/storage';

import { addMessage } from '../../messages/state/messagesActions';

import blastUrls from '../blast/config/blastUrls';

import { ToolsState } from './toolsInitialState';

const POLLING_INTERVAL = 1000 * 3; // 3 seconds

const toolsMiddleware: Middleware = (store) => {
  const { dispatch, getState } = store;

  // rehydrate jobs
  (async () => {
    // Wait for browser idleness
    await new Promise((resolve) => window.requestIdleCallback(resolve));

    const jobStore = new JobStore(Stores.METADATA);

    const persistedJobs = [];
    for await (const persistedJob of jobStore.getAll()) {
      persistedJobs.push(persistedJob as Job);
    }

    // Wait for browser idleness
    await new Promise((resolve) => window.requestIdleCallback(resolve));

    dispatch(rehydrateJobs(persistedJobs));
  })();

  // flag to avoid multiple pollJobs loop being scheduled
  let scheduledPollJobs = false;

  /**
   * Check if a job still exists. Useful before updating a job in any kind of
   * async context
   * @param {Job["internalID"]} id - internal ID of the job ID to check
   */
  const doesJobStillExist = (id: Job['internalID']) =>
    Boolean(getState().tools[id]);

  const checkJobStatus = async (job: RunningJob) => {
    const url = job.type === 'blast' ? blastUrls.statusUrl(job.remoteID) : '';
    const response = fetchData(url, {
      headers: {
        Accept: 'text/plain',
      },
    });
    const status = await response.text();
    if (!doesJobStillExist(job.internalID)) return;
    dispatch(
      updateJob({
        ...job,
        status,
      })
    );
  };

  const processJob = async (job: Job) => {
    if (job.status === Status.CREATED) {
      const status = await checkJobStatus(job);
      // TODO should we check what the status is before dispatching?
      dispatch(updateJob({ ...getState(), status: status }));
    }
  };

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
        if (!doesJobStillExist(job.internalID)) return;
        const now = Date.now();
        dispatch(
          updateJob({
            ...job,
            status: Status.RUNNING,
            remoteID: jobId,
            timeSubmitted: now,
            timeLastUpdate: now,
          })
        );
      })
      .catch((error) => {
        dispatch(
          updateJob({
            ...job,
            status: Status.FAILED,
          })
        );
        dispatch(
          addMessage({
            id: 'job-id',
            content: `Could not run job: ${error.message}`,
            format: MessageFormat.POP_UP,
            level: MessageLevel.FAILURE,
            tag: MessageTag.JOB,
          })
        );
      });
  };

  // main loop
  const pollJobs = async () => {
    console.log('started a loop');
    // Wait for browser idleness
    await new Promise((resolve) => window.requestIdleCallback(resolve));

    const toolsState: ToolsState = getState().tools;

    const jobsToSubmit: Array<CreatedJob> = [];
    const jobsToPoll: Array<RunningJob> = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const job of Object.values(toolsState)) {
      if (job.status === Status.CREATED) {
        jobsToSubmit.push(job);
      } else if (job.status === Status.RUNNING) {
        jobsToPoll.push(job);
      }
    }

    // nothing to check, early exit, no recursion
    if (!(jobsToSubmit.length || jobsToPoll.length)) {
      scheduledPollJobs = false;
      console.log('finished a loop, and stopping');
      return;
    }

    for (const createdJob of jobsToSubmit) {
      await submitJob(createdJob);
    }

    for (const runningJob of jobsToPoll) {
      await checkJobStatus(runningJob);
    }

    // reset flag
    scheduledPollJobs = false;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    schedulePollJobs();
    console.log('finished a loop');
  };

  const schedulePollJobs = () => {
    console.log('scheduled loop');
    if (scheduledPollJobs) return;
    setTimeout(pollJobs, POLLING_INTERVAL);
    scheduledPollJobs = true;
  };

  // initial loop
  // NOTE: there is no point of calling it here, it would need to be called
  // rehydrating jobs from IndexedDB
  schedulePollJobs();

  return (next) => (action) => {
    switch (action.type) {
      case CREATE_JOB:
        schedulePollJobs();
        break;
      default:
      // do nothing
    }

    // state is not yet updated
    const returnValue = next(action);
    // state is now updated

    return returnValue;
  };
};

export default toolsMiddleware;
