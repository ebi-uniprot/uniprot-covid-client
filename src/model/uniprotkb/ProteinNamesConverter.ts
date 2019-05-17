import idx from 'idx';
import { ProteinNamesData } from './sections/NamesAndTaxonomyConverter';

const processProteinData = (data: ProteinNamesData) => {
  const recommendedName = idx(data, _ => _.recommendedName.fullName.value);
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
  const shortNames = idx(data, _ =>
    _.recommendedName.shortNames.map(shortName => shortName.value).join(', ')
  );
  return { recommendedName, shortNames, alternativeNames };
};

export default processProteinData;
