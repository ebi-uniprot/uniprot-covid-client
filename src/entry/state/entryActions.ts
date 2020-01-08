import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import fetchData from '../../utils/fetchData';
import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import apiUrls from '../../utils/apiUrls';

export const REQUEST_ENTRY = 'REQUEST_ENTRY';
export const RECEIVE_ENTRY = 'RECEIVE_ENTRY';

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
