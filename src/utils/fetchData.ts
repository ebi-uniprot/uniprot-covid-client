import axios from 'axios';

export default function fetchData(url: string, headers: object = {}) {
  return axios.get(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });
}
