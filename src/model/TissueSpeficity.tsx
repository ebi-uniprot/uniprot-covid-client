import React, { Fragment } from 'react';
import v1 from 'uuid';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { EvidenceType } from './types/modelTypes';
import { FreeTextType } from './FreeText';

type Comments = {
  commentType: FreeTextType;
  texts: [
    {
      value: string;
      evidences?: EvidenceType[];
    }
  ];
};

type TissueData = {
  comments?: [Comments];
};

type TissueProps = {
  data: TissueData;
};

export const TissueSpeficity: React.FC<TissueProps> = ({ data }) => {
  const isValid = (d: Comments) =>
    d.commentType === FreeTextType.TISSUE_SPECIFICITY &&
    d.texts &&
    d.texts.length > 0;
  if (!data.comments || !data.comments.some(d => isValid(d))) {
    return null;
  }
  const tissueSpecifityData = data.comments.filter(d => isValid(d));
  if (!tissueSpecifityData || tissueSpecifityData.length <= 0) {
    return null;
  }
  return (
    <Fragment>
      <h4>Tissue specificity</h4>
      {tissueSpecifityData.map(tissueSpecifity =>
        tissueSpecifity.texts.map(textEntry => {
          const { value, evidences } = textEntry;
          if (!value) {
            return;
          }
          let evidencesNodes;
          if (evidences) {
            evidencesNodes = evidences.map(evidence => (
              <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
            ));
          }
          return (
            <p key={v1()}>
              {value}
              {evidencesNodes}
            </p>
          );
        })
      )}
    </Fragment>
  );
};

export default TissueSpeficity;
