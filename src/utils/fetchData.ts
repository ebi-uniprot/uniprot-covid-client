import axios from 'axios';

export default function fetchData(
  url: string,
  options: { headers?: object; method?: string; data?: object } = {
    headers: {},
    method: 'get',
  }
) {
  const { headers, method, data } = options;
  return axios(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    method,
    data,
  });
}
