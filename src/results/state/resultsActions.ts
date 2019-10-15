import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import idx from 'idx';
import fetchData from '../../utils/fetchData';
import { RootState } from '../../state/state-types';
import 'regenerator-runtime/runtime';
import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';

export const REQUEST_BATCH_OF_RESULTS = 'REQUEST_BATCH_OF_RESULTS';
export const RECEIVE_BATCH_OF_RESULTS = 'RECEIVE_BATCH_OF_RESULTS';
export const UPDATE_COLUMN_SORT = 'UPDATE_COLUMN_SORT';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const SWITCH_VIEW_MODE = 'SWITCH_VIEW_MODE';
export const UPDATE_SUMMARY_ACCESSION = 'UPDATE_SUMMARY_ACCESSION';

export const receiveBatchOfResults = (
  url: string,
  data: Response['data'],
  nextUrl: string | undefined,
  totalNumberResults: number
) =>
  action(RECEIVE_BATCH_OF_RESULTS, {
    url,
    data,
    nextUrl,
    totalNumberResults,
    receivedAt: Date.now(),
  });
export const requestBatchOfResults = (url: string) =>
  action(REQUEST_BATCH_OF_RESULTS, { url });

const getNextUrlFromResponse = (
  link: string | null | undefined
): string | undefined => {
  if (!link) {
    return;
  }
  const re = /<([0-9a-zA-Z$\-_.+!*'(),?/:=&%]+)>; rel="next"/;
  const match = re.exec(link);
  if (match) {
    // eslint-disable-next-line consistent-return
    return match[1];
  }
};

export const clearResults = () => action(CLEAR_RESULTS);

type Response = {
  data: { results: UniProtkbAPIModel[]; facets: Facet[] };
  headers: {
    ['x-totalrecords']: number;
    link: string;
  };
};

export const fetchBatchOfResults = (url: string, state: RootState) => async (
  dispatch: Dispatch
) => {
  dispatch(requestBatchOfResults(url));
  fetchData(url).then((response: Response) => {
    const nextUrl = getNextUrlFromResponse(idx(response, o => o.headers.link));
    dispatch(
      receiveBatchOfResults(
        url,
        response.data,
        nextUrl,
        response.headers['x-totalrecords']
      )
    );
    if (response.data.results.length > 0 && !state.results.summaryAccession) {
      const firstAccession = response.data.results[0].primaryAccession;
      if (firstAccession) {
        dispatch(
          action(UPDATE_SUMMARY_ACCESSION, { accession: firstAccession })
        );
      }
    }
  });
  // .catch(error => console.error(error)); // the console creates a tslint ...
  // ... error but we want to catch this in the future
};

export const shouldFetchBatchOfResults = (url: string, state: RootState) => {
  const { isFetching, isFetched } = state.results;
  return !isFetching && !isFetched[url];
};

export const fetchBatchOfResultsIfNeeded = (url: string | undefined) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchBatchOfResults(url, getState())) {
    dispatch(fetchBatchOfResults(url, getState()));
  }
};

export const updateSummaryAccession = (accession: string) =>
  action(UPDATE_SUMMARY_ACCESSION, { accession });

export const switchViewMode = () => action(SWITCH_VIEW_MODE);