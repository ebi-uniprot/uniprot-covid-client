import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import idx from 'idx';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import apiUrls from '../../utils/apiUrls';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import getNextUrlFromResponse from '../../utils/queryUtils';
import Response from '../../types/queryTypes';
import { RootState } from '../../state/state-types';

export const REQUEST_ENTRY = 'REQUEST_ENTRY';
export const RECEIVE_ENTRY = 'RECEIVE_ENTRY';
export const RESET_ENTRY = 'RESET_ENTRY';
export const REQUEST_ENTRY_PUBLICATIONS = 'REQUEST_ENTRY_PUBLICATIONS';
export const RECEIVE_ENTRY_PUBLICATIONS = 'RECEIVE_ENTRY_PUBLICATIONS';
export const RESET_ENTRY_PUBLICATIONS = 'RESET_ENTRY_PUBLICATIONS';

export const receiveEntry = (accession: string, data: UniProtkbAPIModel) => {
  return action(RECEIVE_ENTRY, {
    accession,
    data,
    receivedAt: Date.now(),
  });
};

export const requestEntry = () => action(REQUEST_ENTRY);

export const fetchEntry = (accession: string) => async (dispatch: Dispatch) => {
  dispatch(requestEntry());
  const url = apiUrls.entry(accession);
  fetchData(url)
    .then((response: { data: UniProtkbAPIModel }) => {
      dispatch(receiveEntry(accession, response.data));
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};

export const resetEntry = () => action(RESET_ENTRY);

export const receiveEntryPublications = (
  url: string,
  data: LiteratureForProteinAPI[],
  nextUrl: string | undefined,
  total: number
) => {
  return action(RECEIVE_ENTRY_PUBLICATIONS, {
    url,
    data,
    nextUrl,
    total,
    receivedAt: Date.now(),
  });
};

export const requestEntryPublications = () =>
  action(REQUEST_ENTRY_PUBLICATIONS);

export const fetchEntryPublications = (url: string) => async (
  dispatch: Dispatch
) => {
  dispatch(requestEntryPublications());
  fetchData(url)
    .then((response: Response) => {
      const nextUrl = getNextUrlFromResponse(
        idx(response, o => o.headers.link)
      );
      const publicationData = response.data
        .results as LiteratureForProteinAPI[];
      dispatch(
        receiveEntryPublications(
          url,
          publicationData,
          nextUrl,
          response.headers['x-totalrecords']
        )
      );
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};

export const shouldFetchEntryPublications = (url: string, state: RootState) => {
  const { isFetching, isFetched } = state.entry.publicationsData;
  return !isFetching && !isFetched[url];
};

export const fetchEntryPublicationsIfNeeded = (url: string | undefined) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchEntryPublications(url, getState())) {
    dispatch(fetchEntryPublications(url));
  }
};
