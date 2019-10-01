import React, { FC, Fragment } from 'react';
import { EvidenceTag, SwissProtIcon, TremblIcon } from 'franklin-sites';
import { getEvidenceCodeData } from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';
import { groupBy } from '../utils/utils';

const UniProtEvidenceTag: FC<{ evidences: Evidence[] }> = ({ evidences }) => {
  const evidenceMap: Map<string, Evidence[]> = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Array.from(evidenceMap.keys()).map(evidenceCode => {
    const evidenceData = getEvidenceCodeData(evidenceCode);
    if (!evidenceData) {
      return null;
    }
    const references = evidenceMap.get(evidenceCode);
    return (
      <EvidenceTag
        label={
          evidenceData.labelRender
            ? evidenceData.labelRender(references)
            : evidenceData.label
        }
        iconComponent={evidenceData.manual ? <SwissProtIcon /> : <TremblIcon />}
        className={
          evidenceData.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
        }
        key={evidenceCode}
      >
        <div>
          <h5>{evidenceData.label}</h5>
          {references &&
            references
              .filter(reference => reference.id && reference.source)
              .map(reference => (
                <div key={reference.id}>
                  {`${reference.source}:${reference.id}`}
                </div>
              ))}
        </div>
      </EvidenceTag>
    );
  });
  return <Fragment>{evidenceTags}</Fragment>;
};

export default UniProtEvidenceTag;
