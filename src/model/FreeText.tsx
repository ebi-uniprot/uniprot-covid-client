import React, { Fragment } from 'react';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
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
  comments?: [
    {
      commentType: FreeTextType;
      texts: [{ value: string; evidences: EvidenceType[] }];
    }
  ];
};

type FreeTextDataProps = {
  data: FreeTextData;
  type: FreeTextType;
  includeTitle?: boolean;
};

export const FreeText: React.FC<FreeTextDataProps> = ({
  data,
  type,
  includeTitle = false,
}) => {
  if (!data.comments || !data.comments.some(d => d.commentType === type)) {
    return null;
  }
  const freeTextData = data.comments
    .filter(d => d.commentType === type)
    .map((item, i) => (
      <p key={`freetext_${i}_${type}`}>
        {item.texts.map((itemText, j) => {
          return (
            <Fragment key={`freetext_${i}_${type}_${j}`}>
              {itemText.value}
              {itemText.evidences.map(evidence => (
                <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
              ))}
            </Fragment>
          );
        })}
      </p>
    ));

  return (
    <Fragment>
      {includeTitle && (
        <h4 style={{ textTransform: 'capitalize' }}>{type.toLowerCase()}</h4>
      )}
      {freeTextData}
    </Fragment>
  );
};
