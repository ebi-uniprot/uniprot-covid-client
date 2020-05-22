import { Job } from '../blast/types/blastJob';

export const CREATE_JOB = 'CREATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const UPDATE_JOB_TITLE = 'UPDATE_JOB_TITLE';

export const createJob = (job: Job) => ({
  type: CREATE_JOB,
  job,
});

export const updateJob = (job: Job) => ({
  type: UPDATE_JOB,
  job,
});
