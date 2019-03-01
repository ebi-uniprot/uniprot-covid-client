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
      <span key={alternativeName}>, {alternativeName}</span>
    ));
  }
  return (
    <span>
      <strong>{name}</strong> {shortName} {altNames && <span>{altNames}</span>}
    </span>
  );
};

export default NameView;
