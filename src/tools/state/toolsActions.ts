import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../shared/utils/fetchData';
import { RootState } from '../../app/state/rootInitialState';
import postData from '../../uniprotkb/config/postData';
import blastUrls from '../blast/config/blastUrls';
import { BlastFormValues } from '../blast/config/BlastFormData';
import { BlastResults } from '../blast/types/blastResults';
import { Job } from '../blast/types/blastJob';

export const CREATE_JOB = 'CREATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const UPDATE_JOB_STATUS = 'UPDATE_JOB_STATUS';
export const UPDATE_JOB_TITLE = 'UPDATE_JOB_TITLE';

export const createJob = (job: Job) => ({
  type: CREATE_JOB,
  job,
});

export const updateJob = (job: Job) => ({
  type: UPDATE_JOB,
  job,
});
