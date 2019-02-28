import React from 'react';
import NameView from './NameView';
import idx from 'idx';
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
  data: ProteinNamesData;
};

const processShortNames = (
  shortNameList: ProteinNamesDefault['shortNames']
) => {
  if (!shortNameList) {
    return;
  }
  return shortNameList.reduce((r, d) => `, ${d.value}`, '');
};

export const processProteinData = (data: ProteinNamesData) => {
  const recommendedName = idx(
    data,
    _ => _.proteinDescription.recommendedName.fullName.value
  );
  const alternativeNames: string[] = [];
  const ecNumbers = idx(
    data,
    _ => _.proteinDescription.recommendedName.ecNumbers
  );
  if (ecNumbers && ecNumbers.length > 0) {
    alternativeNames.push(...ecNumbers.map(ec => ec.value));
  }
  const submissionNames = idx(data, _ => _.proteinDescription.submissionNames);
  if (submissionNames && submissionNames.length > 0) {
    alternativeNames.push(
      ...submissionNames.map(submissionName => submissionName.fullName.value)
    );
  }
  const alternativeNameArray = idx(
    data,
    _ => _.proteinDescription.alternativeNames
  );
  if (alternativeNameArray) {
    const alternativeName = alternativeNameArray.map(
      altName => altName.fullName.value
    );
    if (alternativeName.length) {
      alternativeNames.push(...alternativeName);
    }
  }
  const shortNames = idx(data, _ =>
    _.proteinDescription.recommendedName.shortNames
      .map(shortName => shortName.value)
      .join(', ')
  );
  return { recommendedName, shortNames, alternativeNames };
};

export const ProteinNames: React.FC<ProteinNamesDataProps> = ({ data }) => {
  const { recommendedName, shortNames, alternativeNames } = processProteinData(
    data
  );
  const props = {
    name: recommendedName,
    shortNames,
    alternativeNames,
  };
  return <NameView {...props} />;
};

export const EntryProteinNames: React.FC<ProteinNamesDataProps> = ({
  data,
}) => {
  const { recommendedName, shortNames, alternativeNames } = processProteinData(
    data
  );
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
