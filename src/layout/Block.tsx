import React from 'react';

import './styles/Block.scss';

type BlockProps = {
  columns: string;
  children: Array<JSX.Element>;
};

const Block: React.FC<BlockProps> = (props) => {
  const { columns, children } = props;
  return <div className={`block block--${columns}-col`}>{children}</div>;
};

export default Block;