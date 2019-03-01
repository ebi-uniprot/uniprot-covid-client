import React from 'react';
import { Link } from 'react-router-dom';

const SimpleView = (props: { termValue: string; linkTo?: string }) => {
  const { termValue, linkTo } = props;
  if (typeof linkTo !== 'undefined') {
    return <Link to={linkTo}>{termValue}</Link>;
  } else {
    return <span>{termValue}</span>;
  }
};

export default SimpleView;
