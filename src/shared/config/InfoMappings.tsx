import React from 'react';
import { Namespace } from '../../uniprotkb/types/searchTypes';
import UniProtKBInfo from '../../uniprotkb/components/results/UniProtKBInfo';

const infoMappings: {
  [index in Namespace]: {
    name: string;
    info: JSX.Element;
    links: { title: string; destination: string }[];
  };
} = {
  uniprotkb: {
    name: 'UniProtKB',
    info: <UniProtKBInfo />,
    links: [],
  },
};

export default infoMappings;
