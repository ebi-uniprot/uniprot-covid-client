import React from 'react';

const SimpleView = (props: { termValue: string }) => {
  const { termValue } = props;
  return <div>{termValue}</div>;
};

export default SimpleView;
