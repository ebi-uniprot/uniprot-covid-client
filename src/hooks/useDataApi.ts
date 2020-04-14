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
};

enum ActionType {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action =
  | { type: ActionType.INIT }
  | { type: ActionType.SUCCESS; response?: AxiosResponse }
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
      return {
        loading: false,
        data: action.response && action.response.data,
        status: action.response && action.response.status,
        statusText: action.response && action.response.statusText,
        headers: action.response && action.response.headers,
      };
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
    let didCancel = false;

    // actual request
    fetchData(url, undefined, source.token).then(
      // handle ok
      (response: AxiosResponse) => {
        if (didCancel) return;
        dispatch({ type: ActionType.SUCCESS, response });
      },
      // catch error
      (error: AxiosError) => {
        if (didCancel) return;
        dispatch({ type: ActionType.ERROR, error });
      }
    );

    // handle unmounting of the hook
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel();
      didCancel = true;
    };
  }, [url]);

  return state;
};

export default useDataApi;
