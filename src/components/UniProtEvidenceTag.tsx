import React, { FC, Fragment } from 'react';
import { EvidenceTag, SwissProtIcon, TremblIcon } from 'franklin-sites';
import { html } from 'lit-html';
import {
  getEvidenceCodeData,
  EvidenceData,
} from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';
import { groupBy } from '../utils/utils';

export const UniProtEvidenceTagContent: FC<{
  evidenceData: EvidenceData;
  references: Evidence[] | undefined;
}> = ({ evidenceData, references }) => (
  <div>
    <h5>{evidenceData.label}</h5>
    {references &&
      references
        .filter((reference: Evidence) => reference.id && reference.source)
        .map((reference: Evidence) => (
          <div key={reference.id}>{`${reference.source}:${reference.id}`}</div>
        ))}
  </div>
);

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
        <UniProtEvidenceTagContent
          evidenceData={evidenceData}
          references={references}
        />
      </EvidenceTag>
    );
  });
  return <Fragment>{evidenceTags}</Fragment>;
};

export const UniProtProtvistaEvidenceTag = (
  evidences: Evidence[],
  callback: Function
) => {
  const evidenceMap: Map<string, Evidence[]> = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Array.from(evidenceMap.keys()).map(evidenceCode => {
    const evidenceData = getEvidenceCodeData(evidenceCode);
    if (!evidenceData) {
      return html``;
    }
    const references = evidenceMap.get(evidenceCode);
    return html`
      <span
        class="evidence-tag"
        @click=${() => callback(evidenceData, references)}
      >
        ${evidenceData.labelRender
          ? evidenceData.labelRender(references)
          : evidenceData.label}</span
      >
    `;
  });
  return evidenceTags;
};

export default UniProtEvidenceTag;
