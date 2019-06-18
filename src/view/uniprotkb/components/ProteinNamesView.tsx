import React, { Fragment } from 'react';
import NameView from './NameView';
import { InfoList } from 'franklin-sites';
import { v1 } from 'uuid';
import {
  ProteinNames,
  ProteinNamesData,
  ProteinDescription,
} from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import UniProtEvidence from '../../../components/UniProtEvidenceTag';
import { ValueWihEvidence } from '../../../model/types/modelTypes';

type ProteinNamesDataProps = {
  recommendedName?: string;
  shortNames?: string;
  alternativeNames?: string[];
};

// TODO this should be split into 2 components, one for columns and one for entry
export const ProteinNamesView: React.FC<ProteinNamesDataProps> = ({
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

const NameWithEvidence: React.FC<{ data: ValueWihEvidence }> = ({ data }) => (
  <Fragment>
    {data.value}{' '}
    {data.evidences &&
      data.evidences.map(evidence => (
        <UniProtEvidence evidence={evidence} key={v1()} />
      ))}
  </Fragment>
);

const ProteinNamesViewFlat: React.FC<{ names?: ProteinNames }> = ({
  names,
}) => {
  if (!names) {
    return null;
  }
  return (
    <Fragment>
      <NameWithEvidence data={names.fullName} />
      {names.shortNames && (
        <Fragment>
          {' ('}
          {names.shortNames
            .map(shortName => <NameWithEvidence data={shortName} key={v1()} />)
            .reduce((acc, shortName) => {
              return acc === null ? (
                shortName
              ) : (
                <Fragment>
                  {acc}; {shortName}
                </Fragment>
              );
            })}
          {') '}
        </Fragment>
      )}
    </Fragment>
  );
};

const ProteinDescriptionView: React.FC<{
  proteinDescription?: ProteinDescription;
}> = ({ proteinDescription }) => {
  if (!proteinDescription) {
    return null;
  }
  return (
    <Fragment>
      <ProteinNamesViewFlat names={proteinDescription.recommendedName} />
      {proteinDescription.alternativeNames && (
        <Fragment>
          {' '}
          <strong>Alternative names: </strong>
          {proteinDescription.alternativeNames.map(alternativeName => (
            <ProteinNamesViewFlat
              names={alternativeName}
              key={alternativeName.fullName.value}
            />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

const getInfoListForNames = (name: ProteinNames) => {
  const infoData = [];

  if (name.fullName) {
    infoData.push({
      title: 'Recommended name',
      content: <NameWithEvidence data={name.fullName} />,
    });
  }
  if (name.ecNumbers) {
    infoData.push({
      title: 'EC number',
      content: (
        <Fragment>
          {name.ecNumbers.map(ecNumber => (
            <NameWithEvidence data={ecNumber} key={v1()} />
          ))}
        </Fragment>
      ),
    });
  }
  if (name.shortNames) {
    infoData.push({
      title: 'Short names',
      content: (
        <Fragment>
          {name.shortNames
            .map(shortName => <NameWithEvidence data={shortName} key={v1()} />)
            .reduce((acc, name) =>
              acc === null ? (
                name
              ) : (
                <Fragment>
                  {acc}; {name}
                </Fragment>
              )
            )}
        </Fragment>
      ),
    });
  }
  return infoData;
};

export const EntryProteinNames: React.FC<{
  proteinNames?: ProteinNamesData;
}> = ({ proteinNames }) => {
  if (!proteinNames) {
    return null;
  }
  let infoData: { title: string; content: JSX.Element }[] = [];
  if (proteinNames.recommendedName) {
    infoData = getInfoListForNames(proteinNames.recommendedName);
  }
  if (proteinNames.alternativeNames) {
    infoData.push({
      title: 'Alternative names',
      content: (
        <ul className="no-bullet">
          {proteinNames.alternativeNames.map(alternativeName => (
            <li key={v1()}>
              <ProteinNamesViewFlat names={alternativeName} />
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (proteinNames.contains) {
    infoData.push({
      title: `Cleaved into ${proteinNames.contains.length} chains`,
      content: (
        <ul className="no-bullet">
          {proteinNames.contains.map(contains => (
            <li key={v1()}>
              <ProteinDescriptionView proteinDescription={contains} />
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (proteinNames.submissionNames) {
    infoData.push({
      title: 'Submission names',
      content: (
        <ul className="no-bullet">
          {proteinNames.submissionNames.map(submission => (
            <li key={v1()}>
              <ProteinNamesViewFlat names={submission} />
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (proteinNames.biotechName) {
    infoData.push({
      title: 'Biotech name',
      content: <NameWithEvidence data={proteinNames.biotechName} />,
    });
  }

  if (proteinNames.cdAntigenNames) {
    infoData.push({
      title: 'CD Antigen Name',
      content: <NameWithEvidence data={proteinNames.cdAntigenNames} />,
    });
  }

  if (proteinNames.innNames) {
    infoData.push({
      title: 'INN Name',
      content: <NameWithEvidence data={proteinNames.innNames} />,
    });
  }

  return (
    <Fragment>
      <InfoList infoData={infoData} />
    </Fragment>
  );
};
