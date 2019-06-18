import { ValueWihEvidence } from '../../types/modelTypes';
import { Flag } from './SequenceConverter';
import { convertGeneNames } from '../GeneNamesConverter';

export type ProteinNames = {
  fullName: ValueWihEvidence;
  shortNames?: ValueWihEvidence[];
  ecNumbers?: ValueWihEvidence[];
};

export type ProteinDescription = {
  recommendedName?: ProteinNames;
  submissionNames?: ProteinNames[];
  alternativeNames?: ProteinNames[];
  allergenName?: ValueWihEvidence;
  biotechName?: ValueWihEvidence;
  cdAntigenNames?: ValueWihEvidence;
  innNames?: ValueWihEvidence;
  flag?: Flag;
};

export type ProteinNamesData = ProteinDescription & {
  includes?: ProteinDescription[];
  contains?: ProteinDescription[];
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

type NamesAndTaxonomyAPIModel = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: OrganismData;
};

export type NamesAndTaxonomyUIModel = {
  proteinNamesData?: ProteinNamesData;
  // {
  //   recommendedName?: string;
  //   shortNames?: string;
  //   alternativeNames?: string[];
  // };
  geneNamesData?: { name: string; alternativeNames: string[] };
  organismData?: {};
};

export const convertNamesAndTaxonomy = (data: NamesAndTaxonomyAPIModel) => {
  const namesAndTaxonomyData: NamesAndTaxonomyUIModel = {};
  if (data.proteinDescription) {
    namesAndTaxonomyData.proteinNamesData = data.proteinDescription;
    // convertProteinNames(
    //   data.proteinDescription
    // );
  }
  if (data.genes) {
    namesAndTaxonomyData.geneNamesData = convertGeneNames(data.genes);
  }
  if (data.organism) {
    namesAndTaxonomyData.organismData = data.organism;
  }
  return namesAndTaxonomyData;
};
