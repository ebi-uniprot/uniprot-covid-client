import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
import { BlastFormValues } from '../data/BlastFormData';
import blastUrls from '../utils/blastUrls';
import { RootState } from '../../state/state-types';

export const RUN_BLAST_JOB = 'RUN_BLAST_JOB';
export const RECEIVE_BLAST_JOB_ID = 'RECEIVE_BLAST_JOB_ID';
export const POLL_BLAST_STATUS = 'POLL_BLAST_STATUS';
export const FETCH_BLAST_RESULTS = 'FETCH_BLAST_RESULTS';
export const RECEIVE_BLAST_RESULTS = 'FETCH_BLAST_RESULTS';

// RUNNING
// FINISHED

export const receiveBlastJobID = (jobId: string) =>
  action(RECEIVE_BLAST_JOB_ID, { jobId });

export const receiveBlastResults = (jobId: string, data) => {
  return action(RECEIVE_BLAST_RESULTS, {
    jobId,
    data,
  });
};

export const fetchBlastResults = (jobId: string) => async (
  dispatch: Dispatch
) => {
  return fetchData(blastUrls.resultUrl(jobId))
    .then(({ data }) => {
      dispatch(receiveBlastResults(jobId, data));
      action(FETCH_BLAST_RESULTS);
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};

function* pollForBlastStatus(jobId: string) {
  while (true) {
    yield fetchData(blastUrls.statusUrl(jobId), {
      headers: {
        Accept: 'text/plain',
      },
      method: 'get',
    }).then(response => {
      return response.data;
    });
  }
}

const runPolling = (
  jobId: string,
  generator?: IterableIterator<Promise<string>>
) => (dispatch: ThunkDispatch<RootState, void, Action>) => {
  if (!generator) {
    // eslint-disable-next-line no-param-reassign
    generator = pollForBlastStatus(jobId);
  }

  const p = generator.next();
  p.value.then((d: string) => {
    if (d === 'RUNNING') {
      dispatch(runPolling(jobId, generator));
    } else {
      dispatch(fetchBlastResults(jobId));
      // return action(POLL_BLAST_STATUS, {});
    }
  });
};

export const runBlastJob = (blastFormValues: BlastFormValues) => (
  dispatch: ThunkDispatch<RootState, void, Action>
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
      dispatch(receiveBlastJobID(response.data));
      dispatch(runPolling(response.data));
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};
