import { useEffect, useReducer } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import fetchData from '../utils/fetchData';

type State = {
  loading: boolean;
  data?: AxiosResponse['data'];
  status?: AxiosResponse['status'];
  statusText?: AxiosResponse['statusText'];
  headers?: AxiosResponse['headers'];
  error?: AxiosError;
  redirectedTo?: string;
};

enum ActionType {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action =
  | { type: ActionType.INIT }
  | { type: ActionType.SUCCESS; response?: AxiosResponse; originalURL?: string }
  | { type: ActionType.ERROR; error: AxiosError };

// eslint-disable-next-line consistent-return
const reducer = (state: State, action: Action): State => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.INIT:
      return {
        loading: true,
      };
    case ActionType.SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const newState: State = {
        loading: false,
        data: action.response && action.response.data,
        status: action.response && action.response.status,
        statusText: action.response && action.response.statusText,
        headers: action.response && action.response.headers,
      };
      if (
        action.response &&
        action.response.request.responseURL &&
        action.response.request.responseURL !== action.originalURL
      ) {
        newState.redirectedTo = action.response.request.responseURL;
      } else if (
        // Issue with casing in axios-mock-adapter?
        action.response &&
        action.response.request.responseUrl &&
        action.response.request.responseUrl !== action.originalURL
      ) {
        newState.redirectedTo = action.response.request.responseUrl;
      }
      return newState;
    case ActionType.ERROR:
      return {
        loading: false,
        status: action.error.response && action.error.response.status,
        statusText: action.error.response && action.error.response.statusText,
        headers: action.error.response && action.error.response.headers,
        error: action.error,
      };
  }
};

const useDataApi = (url?: string): State => {
  const [state, dispatch] = useReducer(reducer, { loading: !!url });

  useEffect(() => {
    // we don't require a URL, we just don't need data anymore
    // assume succes with no data
    if (!url) {
      dispatch({ type: ActionType.SUCCESS });
      return;
    }

    dispatch({ type: ActionType.INIT });

    // variables to handle cancellation
    const source = axios.CancelToken.source();

    // actual request
    fetchData(url, undefined, source.token).then(
      // handle ok
      (response: AxiosResponse) =>
        dispatch({ type: ActionType.SUCCESS, response, originalURL: url }),
      // catch error
      (error: AxiosError) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ActionType.ERROR, error });
      }
    );

    // handle unmounting of the hook
    // eslint-disable-next-line consistent-return
    return () => source.cancel();
  }, [url]);

  return state;
};

export default useDataApi;
