// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  columns: string,
  children: Node,
};

const Block = (props: Props) => {
  const { columns, children } = props;
  return <div className={`block block--${columns}-col`}>{children}</div>;
};

export default Block;
