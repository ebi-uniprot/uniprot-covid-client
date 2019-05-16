import React from 'react';
import NameView from './NameView';
import { InfoList } from 'franklin-sites';
import { ValueWihEvidence } from './types/modelTypes';

type ProteinNamesDefault = {
  fullName: ValueWihEvidence;
  shortNames?: ValueWihEvidence[];
  ecNumbers?: ValueWihEvidence[];
};

type ProteinDescriptionDefault = {
  recommendedName?: ProteinNamesDefault;
  submissionNames?: ProteinNamesDefault[];
  alternativeNames?: ProteinNamesDefault[];
  allergenName?: ValueWihEvidence;
  biotechName?: ValueWihEvidence;
  cdAntigenNames?: ValueWihEvidence;
  innNames?: ValueWihEvidence;
};

export type ProteinNamesData = {
  proteinDescription: ProteinDescriptionDefault & {
    includes: ProteinDescriptionDefault[];
    contains: ProteinDescriptionDefault[];
  };
};

type ProteinNamesDataProps = {
  recommendedName: string;
  shortNames?: string;
  alternativeNames?: string[];
};

const processShortNames = (
  shortNameList: ProteinNamesDefault['shortNames']
) => {
  if (!shortNameList) {
    return;
  }
  return shortNameList.reduce((r, d) => `, ${d.value}`, '');
};

export const ProteinNames: React.FC<ProteinNamesDataProps> = ({
  recommendedName,
  shortNames,
  alternativeNames,
}) => {
  const props = {
    name: recommendedName,
    shortNames,
    alternativeNames,
  };
  return <NameView {...props} />;
};

export const EntryProteinNames: React.FC<ProteinNamesDataProps> = ({
  recommendedName,
  shortNames,
  alternativeNames,
}) => {
  const infoData = [
    {
      title: 'Recommended name',
      content: recommendedName,
    },
    {
      title: 'Short names',
      content: shortNames,
    },
    {
      title: 'Alternative names',
      content: alternativeNames,
    },
  ];
  return <InfoList infoData={infoData} />;
};
