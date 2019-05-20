import { convertProteinNames } from '../ProteinNamesConverter';
import { ValueWihEvidence } from '../../types/modelTypes';
import { Flag } from './SequenceConverter';
import { convertGeneNames } from '../GeneNamesConverter';

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

export type GeneNamesData = {
  geneName: {
    value: string;
  };
  synonyms?: [{ value: string }];
  orfNames?: [{ value: string }];
}[];

export type OrganismData = {
  scientificName?: string;
  commonName?: string;
  synonyms?: string[];
  taxonId?: number;
};

type data = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: OrganismData;
};

export type NamesAndTaxonomyDataModel = {
  proteinNamesData?: {
    recommendedName?: string;
    shortNames?: string;
    alternativeNames?: string[];
  };
  geneNamesData?: { name: string; alternativeNames: string[] };
  organismData?: {};
};

export const convertNamesAndTaxonomy = (data: data) => {
  const namesAndTaxonomyData: NamesAndTaxonomyDataModel = {};
  if (data.proteinDescription) {
    namesAndTaxonomyData.proteinNamesData = convertProteinNames(
      data.proteinDescription
    );
  }
  if (data.genes) {
    namesAndTaxonomyData.geneNamesData = convertGeneNames(data.genes);
  }
  if (data.organism) {
    namesAndTaxonomyData.organismData = data.organism;
  }
  return namesAndTaxonomyData;
};
