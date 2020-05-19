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
    name: 'COVID-19 UniProtKB',
    info: <UniProtKBInfo />,
    links: [
      // { title: 'Help', destination: '' },
      // { title: 'Video', destination: '' },
    ],
  },
};

export default infoMappings;
