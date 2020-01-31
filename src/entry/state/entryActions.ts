import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../utils/fetchData';
import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import apiUrls from '../../utils/apiUrls';
import { RootState } from '../../state/state-types';

export const REQUEST_ENTRY = 'REQUEST_ENTRY';
export const RECEIVE_ENTRY = 'RECEIVE_ENTRY';
export const RESET_ENTRY = 'RESET_ENTRY';

export const receiveEntry = (accession: string, data: UniProtkbAPIModel) => {
  return action(RECEIVE_ENTRY, {
    accession,
    data,
    receivedAt: Date.now(),
  });
};

export const requestEntry = () => action(REQUEST_ENTRY);

const shouldFetchEntry = (accessionToFetch: string, state: RootState) => {
  const { accession, isFetching } = state.entry;
  return !isFetching || accession === accessionToFetch;
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
