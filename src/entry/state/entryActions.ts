import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import idx from 'idx';
import { v1 } from 'uuid';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../model/uniprotkb/UniProtkbConverter';
import apiUrls from '../../utils/apiUrls';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import getNextUrlFromResponse from '../../utils/queryUtils';
import Response, { Facet } from '../../types/responseTypes';
import { RootState } from '../../state/state-types';

export const REQUEST_ENTRY = 'REQUEST_ENTRY';
export const RECEIVE_ENTRY = 'RECEIVE_ENTRY';
export const RESET_ENTRY = 'RESET_ENTRY';
export const REQUEST_ENTRY_PUBLICATIONS = 'REQUEST_ENTRY_PUBLICATIONS';
export const RECEIVE_ENTRY_PUBLICATIONS = 'RECEIVE_ENTRY_PUBLICATIONS';
export const RESET_ENTRY_PUBLICATIONS = 'RESET_ENTRY_PUBLICATIONS';
export const SET_SELECTED_FACETS = 'SET_SELECTED_FACETS';

type EntryPublicationsData = {
  facets: Facet[];
  results: LiteratureForProteinAPI[];
};

export const receiveEntry = (
  accession: string,
  dataAPIModel: UniProtkbAPIModel
) => {
  const data = uniProtKbConverter(dataAPIModel);
  return action(RECEIVE_ENTRY, {
    accession,
    data,
    receivedAt: Date.now(),
  });
};

export const requestEntry = () => action(REQUEST_ENTRY);

const shouldFetchEntry = (accessionToFetch: string, state: RootState) => {
  const { accession, isFetching } = state.entry;
  return !isFetching || accession !== accessionToFetch;
};

export const fetchEntry = (accession: string) => async (dispatch: Dispatch) => {
  dispatch(requestEntry());
  const url = apiUrls.entry(accession);
  fetchData(url)
    .then(({ data }: { data: UniProtkbAPIModel }) => {
      dispatch(receiveEntry(accession, data));
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};

export const fetchEntryIfNeeded = (accession: string) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (shouldFetchEntry(accession, getState())) {
    dispatch(fetchEntry(accession));
  }
};

export const resetEntry = () => action(RESET_ENTRY);

export const receiveEntryPublications = (
  url: string,
  data: EntryPublicationsData,
  nextUrl: string | undefined,
  total: string,
  reset = true
) =>
  action(RECEIVE_ENTRY_PUBLICATIONS, {
    url,
    data,
    nextUrl,
    total,
    reset,
    receivedAt: Date.now(),
  });

export const requestEntryPublications = () =>
  action(REQUEST_ENTRY_PUBLICATIONS);

export const fetchEntryPublications = (
  url: string,
  reset = false
) => async (dispatch: Dispatch) => {
  dispatch(requestEntryPublications());
  fetchData(url)
    .then((response: Response) => {
      const nextUrl = getNextUrlFromResponse(
        idx(response, o => o.headers.link)
      );
      const publicationData = response.data as EntryPublicationsData;
      const publicationDataWithIds = {
        ...publicationData,
        results: publicationData.results.map(publication => ({
          ...publication,
          id: v1(),
        })),
      };
      dispatch(
        receiveEntryPublications(
          url,
          publicationDataWithIds,
          nextUrl,
          response.headers['x-totalrecords'],
          reset
        )
      );
    }) /* eslint-disable no-console */
    .catch(error => console.error(error));
};

export const shouldFetchEntryPublications = (url: string, state: RootState) => {
  const { isFetching } = state.entry.publicationsData;
  return !isFetching;
};

export const fetchEntryPublicationsIfNeeded = (
  url: string | undefined,
  reset = true
) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchEntryPublications(url, getState())) {
    dispatch(fetchEntryPublications(url, reset));
  }
};

export const resetEntryPublications = () => action(RESET_ENTRY_PUBLICATIONS);
