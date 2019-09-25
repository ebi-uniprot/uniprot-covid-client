import React from 'react';
import { EvidenceTag } from 'franklin-sites';
import { getEvidenceCodeData } from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';
import { groupBy } from '../utils/utils';

type UniProtEvidenceProps = {
  evidences: Evidence[];
};

const UniProtEvidence: React.FC<UniProtEvidenceProps> = ({ evidences }) => {
  const evidenceMap: Map<string, Evidence[]> = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  console.log(evidenceMap);
  return Array.from(evidenceMap.keys()).map(evidenceCode => {
    const evidenceData = getEvidenceCodeData(evidenceCode);
    const references = evidenceMap.get(evidenceCode);
    if (!evidenceData) {
      return null;
    }
    return (
      <EvidenceTag
        label={
          evidenceData.labelRender
            ? evidenceData.labelRender(references ? references.length : '')
            : evidenceData.label
        }
        labelClassName=""
        key={evidenceCode}
      >
        <div>
          <h5>{evidenceData.label}</h5>
          {references &&
            references.map(reference => (
              <div key={reference.id}>
                {reference.source}:{reference.id}
              </div>
            ))}
        </div>
      </EvidenceTag>
    );
  });
};

export default UniProtEvidence;
