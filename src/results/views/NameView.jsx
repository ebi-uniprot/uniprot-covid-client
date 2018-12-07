import React from 'react';

const NameView = (props) => {
  const { name, shortName, alternativeNames } = props;
  const altNames = alternativeNames.map(alternativeName => (
    <span key={alternativeName}>{alternativeName}</span>
  ));
  return (
    <div>
      <strong>{name}</strong>
      {shortName}
      {altNames.length ? (
        <span>
          {' | '}
          {altNames}
        </span>
      ) : (
        undefined
      )}
    </div>
  );
};

export default NameView;
