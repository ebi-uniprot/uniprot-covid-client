import React from 'react';
import { Namespace } from '../search/types/searchTypes';
import UniProtKBInfo from './UniProtKBInfo';

const infoMappings: {
  [index in Namespace]: {
    name: string;
    info: JSX.Element;
    links: { title: string; destination: string }[];
  }
} = {
  uniprotkb: {
    name: 'Covid-19 UniProtKB',
    info: <UniProtKBInfo />,
    links: [],
  },
};

export default infoMappings;
