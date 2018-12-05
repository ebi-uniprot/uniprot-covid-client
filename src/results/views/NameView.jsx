import React from 'react';

const NameView = (props) => {
  const { name, shortName, alternativeNames } = props;
  return (
    <div>
      <strong>{name}</strong>
      {shortName}
      {alternativeNames.map(alternativeName => (
        <span key={alternativeName}>{alternativeName}</span>
      ))}
    </div>
  );
};

export default NameView;
