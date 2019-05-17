import processProteinData from '../ProteinNamesConverter';
import { IDXOptional } from 'idx';
import { ValueWihEvidence } from '../../types/modelTypes';
import { Flag } from './SequenceConverter';

export type ProteinNamesDefault = {
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
  flag?: Flag;
};

export type ProteinNamesData = ProteinDescriptionDefault & {
  includes?: ProteinDescriptionDefault[];
  contains?: ProteinDescriptionDefault[];
};

type data = {
  proteinDescription?: ProteinNamesData;
};

export type NamesAndTaxonomyDataModel = {
  proteinNamesData?: {
    recommendedName?: IDXOptional<string>;
    shortNames?: IDXOptional<string>;
    alternativeNames?: string[];
  };
};

const namesAndTaxonomyConverter = (data: data) => {
  const namesAndTaxonomyData: NamesAndTaxonomyDataModel = {};
  if (data.proteinDescription) {
    namesAndTaxonomyData.proteinNamesData = processProteinData(
      data.proteinDescription
    );
  }
  return namesAndTaxonomyData;
};

export default namesAndTaxonomyConverter;
