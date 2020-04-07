/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import fetchData from './fetchData';

const useDataApi = (url: string) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(url);
        setData(result.data);
      } catch (error) {
        if (error.response.status !== '404') console.error(error);
        setData(null);
      }
    };
    getData();
  }, [url]);

  return data;
};

export default useDataApi;
