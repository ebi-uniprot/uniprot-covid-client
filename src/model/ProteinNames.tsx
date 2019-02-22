import React from 'react';
import NameView from './NameView';
import idx from 'idx';
import { InfoList } from 'franklin-sites';

export type ProteinNamesData = {
  proteinDescription: {
    recommendedName?: {
      fullName: {
        value: string;
      };
    };
    submissionNames?: [
      {
        fullName: {
          value: string;
        };
      }
    ];
    shortNames?: [
      {
        value: string;
      }
    ];
    alternativeNames?: [
      {
        fullName: { value: string };
      }
    ];
    ecNumbers?: [
      {
        value: string;
      }
    ];
  };
};

type ProteinNamesDataProps = {
  data: ProteinNamesData;
};

const processData = (data: ProteinNamesData) => {
  const name = idx(
    data,
    _ => _.proteinDescription.recommendedName.fullName.value
  );
  const alternativeNames: string[] = [];
  const ecNumbers = idx(data, _ => _.proteinDescription.ecNumbers);
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
    _.proteinDescription.shortNames.map(shortName => shortName.value).join(', ')
  );
  return { name, shortNames, alternativeNames };
};

export const ProteinNames: React.FC<ProteinNamesDataProps> = ({ data }) => {
  const { name, shortNames, alternativeNames } = processData(data);
  const props = {
    name,
    shortNames,
    alternativeNames,
  };
  return <NameView {...props} />;
};

export const EntryProteinNames: React.FC<ProteinNamesDataProps> = ({
  data,
}) => {
  const { name, shortNames, alternativeNames } = processData(data);
  const infoData = [
    {
      title: 'Recommended name',
      content: name,
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
