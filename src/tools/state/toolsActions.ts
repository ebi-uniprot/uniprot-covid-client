import { action } from 'typesafe-actions';

import { FormParameters } from '../blast/types/blastFormParameters';
import { Job } from '../blast/types/blastJob';

export const REHYDRATE_JOBS = 'REHYDRATE_JOBS';
export const CREATE_JOB = 'CREATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const UPDATE_JOB_TITLE = 'UPDATE_JOB_TITLE';

/**
 * @param {FormParameters} parameters - job parameters to be kept in the application logic
 * @param {"blast"} jobType = job type (needs to be defined properly when adding other things than Blast)
 */
export const createJob = (parameters: FormParameters, jobType: 'blast') =>
  action(CREATE_JOB, {
    parameters,
    jobType,
  });

export const updateJob = (job: Job) => action(UPDATE_JOB, { job });

export const rehydrateJobs = (jobs: Array<Job>) =>
  action(REHYDRATE_JOBS, { jobs });

export const updateJobTitle = (id: Job['internalID'], title: 'string') =>
  action(UPDATE_JOB_TITLE, { id, title });

export const deleteJob = (id: Job['internalID']) => action(DELETE_JOB, { id });
