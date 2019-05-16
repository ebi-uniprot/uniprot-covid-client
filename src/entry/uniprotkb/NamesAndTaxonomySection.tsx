import React, { Fragment, FC } from 'react';
import idx from 'idx';

import { EntryProteinNames, ProteinNamesData } from '../../model/ProteinNames';

type data = ProteinNamesData;

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

const NamesAndTaxonomySection: FC<{ entryData: data }> = ({ entryData }) => (
  <Fragment>
    <EntryProteinNames data={entryData} />
  </Fragment>
);

export default NamesAndTaxonomySection;
