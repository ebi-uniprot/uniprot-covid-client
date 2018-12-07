import axios from 'axios';

export default function fetchData(url) {
  return axios.get(url, {
    headers: {
      Accept: 'application/json',
    },
  });
}
