import React from 'react';

const NameView = ({ name, shortName, alternativeNames }) => (
  <div>
    <strong>{name}</strong>
    {shortName}
    {alternativeNames.map(alternativeName => (
      <span key={alternativeName}>{alternativeName}</span>
    ))}
  </div>
);

export default NameView;
