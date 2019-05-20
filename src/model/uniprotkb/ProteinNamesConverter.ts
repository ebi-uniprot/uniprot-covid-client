import idx from 'idx';
import { ProteinNamesData } from './sections/NamesAndTaxonomyConverter';

export const convertProteinNames = (data: ProteinNamesData) => {
  let recommendedName;
  let shortNames;
  if (data.recommendedName) {
    recommendedName = data.recommendedName.fullName.value;
    if (data.recommendedName.shortNames) {
      shortNames = data.recommendedName.shortNames
        .map(shortName => shortName.value)
        .join(', ');
    }
  }
  const alternativeNames: string[] = [];
  const ecNumbers = idx(data, _ => _.recommendedName.ecNumbers);
  if (ecNumbers && ecNumbers.length > 0) {
    alternativeNames.push(...ecNumbers.map(ec => ec.value));
  }
  const submissionNames = idx(data, _ => _.submissionNames);
  if (submissionNames && submissionNames.length > 0) {
    alternativeNames.push(
      ...submissionNames.map(submissionName => submissionName.fullName.value)
    );
  }
  const alternativeNameArray = idx(data, _ => _.alternativeNames);
  if (alternativeNameArray) {
    const alternativeName = alternativeNameArray.map(
      altName => altName.fullName.value
    );
    if (alternativeName.length) {
      alternativeNames.push(...alternativeName);
    }
  }
  return { recommendedName, shortNames, alternativeNames };
};
