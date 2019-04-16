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

type InductionData = {
  comments?: Comments[];
};

type InductionProps = {
  data: InductionData;
};

export const Induction: React.FC<InductionProps> = ({ data }) => {
  const isValid = (d: Comments) =>
    d.commentType === FreeTextType.INDUCTION && d.texts && d.texts.length > 0;
  if (!data.comments || !data.comments.some(d => isValid(d))) {
    return null;
  }
  const inductionData = data.comments.filter(d => isValid(d));
  if (!inductionData || inductionData.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <h4>Induction</h4>
      {inductionData.map(induction =>
        induction.texts.map(textEntry => {
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

export default Induction;
