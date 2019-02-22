import React from 'react';

type NameViewProps = {
  name: string | null | undefined;
  shortName?: string | null | undefined;
  alternativeNames?: string[];
};

const NameView = (props: NameViewProps) => {
  const { name, shortName, alternativeNames } = props;
  let altNames;
  if (alternativeNames && alternativeNames.length > 0) {
    altNames = alternativeNames.map(alternativeName => (
      <span key={alternativeName}> {alternativeName}</span>
    ));
  }
  return (
    <div>
      <strong>{name}</strong> {shortName}{' '}
      {altNames ? <span>{altNames}</span> : undefined}
    </div>
  );
};

export default NameView;
