import React from 'react';
import { EvidenceTag } from 'franklin-sites';
import { getEvidenceCodeData } from '../model/EvidenceCodes';
import { EvidenceType } from '../model/types/modelTypes';

type UniProtEvidenceProps = {
  evidence: EvidenceType;
};

const UniProtEvidence: React.FC<UniProtEvidenceProps> = ({ evidence }) => {
  const evidenceData = getEvidenceCodeData(evidence.evidenceCode);
  return <EvidenceTag label={evidenceData && evidenceData.label} />;
};

export default UniProtEvidence;
