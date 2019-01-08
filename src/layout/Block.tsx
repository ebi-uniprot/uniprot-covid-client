import React from 'react';

import './styles/Block.scss';

type Props = {
  columns: string;
  children: Node;
};

const Block = (props: Props) => {
  const { columns, children } = props;
  return <div className={`block block--${columns}-col`}>{children}</div>;
};

export default Block;
