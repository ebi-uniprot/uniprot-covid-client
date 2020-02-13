import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import fetchData from '../../utils/fetchData';
import { BlastFormValues } from '../data/BlastFormData';
import blastUrls from '../utils/blastUrls';

export const RUN_BLAST_JOB = 'RUN_BLAST_JOB';
export const RECEIVE_BLAST_JOB_ID = 'RECEIVE_BLAST_JOB_ID';
export const POLL_BLAST_STATUS = 'POLL_BLAST_STATUS';
export const FETCH_BLAST_RESULTS = 'FETCH_BLAST_RESULTS';

export const receiveBlastJobID = (jobId: string) =>
  action(RECEIVE_BLAST_JOB_ID, { jobId });

export const runBlastJob = (blastFormValues: BlastFormValues) => async (
  dispatch: Dispatch
) => {
  const url = blastUrls.runUrl;

  const formData = new FormData();

  Object.values(blastFormValues).forEach(blastFieldValue => {
    if (blastFieldValue.selected) {
      formData.append(blastFieldValue.fieldName, blastFieldValue.selected);
    }
  });

  fetchData(url, {
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/plain',
    },
  })
    .then(response => {
      console.log(response);
      dispatch(receiveBlastJobID(response.data));
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};
