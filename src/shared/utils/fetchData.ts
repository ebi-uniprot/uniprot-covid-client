import axios, { CancelToken } from 'axios';

export default function fetchData(
  url: string,
  headers: object = {},
  cancelToken?: CancelToken,
  axiosOptions = {}
) {
  return axios.get(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    cancelToken,
    ...axiosOptions,
  });
}
