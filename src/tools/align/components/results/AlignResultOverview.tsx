import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Loader } from 'franklin-sites';
import alnClustalNum from '../../adapters/alnClustalNum';

const AlignResultOverview = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }
  console.log(data);
  const parsed = alnClustalNum(data);
  console.log(parsed);
  return <pre>{data}</pre>;
};

export default AlignResultOverview;
