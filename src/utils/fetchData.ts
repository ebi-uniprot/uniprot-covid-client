import axios from 'axios';

export default function fetchData(url: string, headers: any) {
  return axios.get(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });
}
