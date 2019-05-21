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
    altNames = alternativeNames.join(', ');
  }
  return (
    <span>
      <strong>{name}</strong> {shortName}
      {altNames && <div>{altNames}</div>}
    </span>
  );
};

export default NameView;
