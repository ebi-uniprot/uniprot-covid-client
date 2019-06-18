import { ValueWihEvidence } from '../../types/modelTypes';
import { Flag } from './SequenceConverter';
import { convertGeneNames } from '../GeneNamesConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { Database } from '../../types/DatabaseTypes';
import { Xref } from '../../utils/XrefUtils';

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
  lineage?: string[];
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
  proteomesData?: Xref[];
};

export const convertNamesAndTaxonomy = (data: UniProtkbAPIModel) => {
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
  if (data.databaseCrossReferences) {
    namesAndTaxonomyData.proteomesData = data.databaseCrossReferences.filter(
      db => db.databaseType === Database.Proteomes
    );
  }

  return namesAndTaxonomyData;
};
