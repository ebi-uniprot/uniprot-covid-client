import axios from 'axios';

export default function fetchData(url: string) {
  return axios.get(url, {
    headers: {
      Accept: 'application/json',
    },
  });
}
