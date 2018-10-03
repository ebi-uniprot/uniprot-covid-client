import React from 'react';


const Block = props => (
  <div className={`block block--${props.columns}-col`}>
    { props.children }
  </div>
);

export default Block;
