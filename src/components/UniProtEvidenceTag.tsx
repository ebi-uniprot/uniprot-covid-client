import React from 'react';
import { EvidenceTag } from 'franklin-sites';
import { getEvidenceCodeData } from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';

type UniProtEvidenceProps = {
  evidence: Evidence;
};

const UniProtEvidence: React.FC<UniProtEvidenceProps> = ({ evidence }) => {
  const evidenceData = getEvidenceCodeData(evidence.evidenceCode);
  return <EvidenceTag label={evidenceData && evidenceData.label} />;
};

export default UniProtEvidence;
