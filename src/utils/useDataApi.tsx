/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import fetchData from './fetchData';

const useDataApi = (url: string, headers: object = {}) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(url, headers);
      setData(result.data);
    };
    getData();
  }, [url, headers]);

  return data;
};

export default useDataApi;
