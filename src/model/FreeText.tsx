import React, { Fragment } from 'react';
import { EvidenceType } from './types/modelTypes';

export enum FreeTextType {
  FUNCTION = 'FUNCTION',
  CATALYTIC_ACTIVITY = 'CATALYTIC ACTIVITY',
  COFACTOR = 'COFACTOR',
  ACTIVITY_REGULATION = 'ACTIVITY REGULATION',
  BIOPHYSICOCHEMICAL_PROPERTIES = 'BIOPHYSICOCHEMICAL PROPERTIES',
  PATHWAY = 'PATHWAY',
  SUBUNIT = 'SUBUNIT',
  INTERACTION = 'INTERACTION',
  SUBCELLULAR_LOCATION = 'SUBCELLULAR LOCATION',
  ALTERNATIVE_PRODUCTS = 'ALTERNATIVE PRODUCTS',
  TISSUE_SPECIFICITY = 'TISSUE SPECIFICITY',
  DEVELOPMENTAL_STAGE = 'DEVELOPMENTAL STAGE',
  INDUCTION = 'INDUCTION',
  DOMAIN = 'DOMAIN',
  PTM = 'PTM',
  RNA_EDITING = 'RNA EDITING',
  MASS_SPECTROMETRY = 'MASS SPECTROMETRY',
  POLYMORPHISM = 'POLYMORPHISM',
  DISEASE = 'DISEASE',
  DISRUPTION_PHENOTYPE = 'DISRUPTION PHENOTYPE',
  ALLERGEN = 'ALLERGEN',
  TOXIC_DOSE = 'TOXIC DOSE',
  BIOTECHNOLOGY = 'BIOTECHNOLOGY',
  PHARMACEUTICAL = 'PHARMACEUTICAL',
  MISCELLANEOUS = 'MISCELLANEOUS',
  SIMILARITY = 'SIMILARITY',
  CAUTION = 'CAUTION',
  SEQUENCE_CAUTION = 'SEQUENCE CAUTION',
  WEBRESOURCE = 'WEBRESOURCE',
  UNKNOWN = 'UNKNOWN',
}

export type FreeTextData = {
  comments: [
    {
      commentType: string;
      texts: [{ value: string; evidences: [EvidenceType] }];
    }
  ];
};

type FreeTextDataProps = {
  data: FreeTextData;
  type: FreeTextType;
};

export const FreeText: React.FC<FreeTextDataProps> = ({ data, type }) => {
  const freeTextData = data.comments
    .filter(d => d.commentType === type)
    .map((item, i) => (
      <p key={i}>{item.texts.map(itemText => itemText.value)}</p>
    ));

  return <Fragment>{freeTextData}</Fragment>;
};
