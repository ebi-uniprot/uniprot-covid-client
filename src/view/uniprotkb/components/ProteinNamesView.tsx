import React, { Fragment } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { v1 } from 'uuid';
import NameView from './NameView';
import {
  ProteinNames,
  ProteinNamesData,
  ProteinDescription,
} from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { ValueWithEvidence } from '../../../model/types/modelTypes';

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
}): JSX.Element => {
  const props = {
    name: recommendedName,
    shortNames,
    alternativeNames,
  };
  return <NameView {...props} />;
};

const NameWithEvidence: React.FC<{ data: ValueWithEvidence }> = ({
  data,
}): JSX.Element => (
  <Fragment>
    {`${data.value} `}
    {data.evidences && <UniProtEvidenceTag evidences={data.evidences} />}
  </Fragment>
);

const ProteinNamesViewFlat: React.FC<{ names?: ProteinNames }> = ({
  names,
}): JSX.Element | null => {
  if (!names) {
    return null;
  }
  return (
    <Fragment>
      <NameWithEvidence data={names.fullName} />
      {names.shortNames && (
        <Fragment>
          {' ('}
          {names.shortNames.map(
            (shortName, index): JSX.Element => (
              <Fragment>
                {index > 0 && '; '}
                <NameWithEvidence data={shortName} key={v1()} />
              </Fragment>
            )
          )}
          {') '}
        </Fragment>
      )}
    </Fragment>
  );
};

const ProteinDescriptionView: React.FC<{
  proteinDescription?: ProteinDescription;
}> = ({ proteinDescription }): JSX.Element | null => {
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
          {proteinDescription.alternativeNames.map(
            (alternativeName): JSX.Element => (
              <ProteinNamesViewFlat
                names={alternativeName}
                key={alternativeName.fullName.value}
              />
            )
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const getInfoListForNames = (
  name: ProteinNames
): { title: string; content: JSX.Element }[] => {
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
          {name.ecNumbers.map(
            (ecNumber): JSX.Element => (
              <NameWithEvidence data={ecNumber} key={v1()} />
            )
          )}
        </Fragment>
      ),
    });
  }
  if (name.shortNames) {
    infoData.push({
      title: 'Short names',
      content: (
        <Fragment>
          {name.shortNames.map(
            (shortName, i): JSX.Element => (
              <Fragment>
                {i > 0 && '; '}
                <NameWithEvidence data={shortName} key={v1()} />
              </Fragment>
            )
          )}
        </Fragment>
      ),
    });
  }
  return infoData;
};

type ListElement = {
  id: string;
  content: JSX.Element;
};

export const EntryProteinNames: React.FC<{
  proteinNames?: ProteinNamesData;
}> = ({ proteinNames }): JSX.Element | null => {
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
        <ExpandableList descriptionString="alternative names">
          {proteinNames.alternativeNames.map(
            (alternativeName): ListElement => ({
              id: v1(),
              content: <ProteinNamesViewFlat names={alternativeName} />,
            })
          )}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.contains) {
    infoData.push({
      title: `Cleaved into ${proteinNames.contains.length} chains`,
      content: (
        <ExpandableList descriptionString="chains">
          {proteinNames.contains.map(
            (contains): ListElement => ({
              id: v1(),
              content: <ProteinDescriptionView proteinDescription={contains} />,
            })
          )}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.submissionNames) {
    infoData.push({
      title: 'Submission names',
      content: (
        <ExpandableList descriptionString="submission names">
          {proteinNames.submissionNames.map(
            (submission): ListElement => ({
              id: v1(),
              content: <ProteinNamesViewFlat names={submission} />,
            })
          )}
        </ExpandableList>
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
