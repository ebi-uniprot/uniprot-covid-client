import React from 'react';

import './styles/block.scss';

type BlockProps = {
  columns: string;
  children: JSX.Element[];
};

const Block: React.FC<BlockProps> = props => {
  const { columns, children } = props;
  return <div className={`block block--${columns}-col`}>{children}</div>;
};

export default Block;
