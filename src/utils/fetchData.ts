import axios from 'axios';

export default function fetchData(
  url: string,
  options: { headers?: object } = {
    headers: {},
  }
) {
  const { headers } = options;
  return axios.get(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });
}
