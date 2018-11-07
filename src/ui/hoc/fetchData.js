import axios from 'axios';

export default function fetchData(url, config={}) {
  return axios.get(url, config);
}
