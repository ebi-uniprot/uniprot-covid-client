import React, { FC, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import { EvidenceTag, SwissProtIcon, TremblIcon } from 'franklin-sites';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Link } from 'react-router-dom';
import {
  getEvidenceCodeData,
  EvidenceData,
} from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';
import { groupBy, uniq } from '../utils/utils';
import UniProtKBEntryPublications from '../literature/components/UniProtKBEntryPublications';

enum evidenceTagSourceTypes {
  PUBMED = 'PubMed',
  UNIPROT = 'UniProtKB',
  PROSITE_PRORULE = 'PROSITE-ProRule',
}

export const UniProtEvidenceTagContent: FC<{
  evidenceData: EvidenceData;
  references: Evidence[] | undefined;
}> = ({ evidenceData, references }) => {
  if (!references || references.length <= 0) {
    return null;
  }
  // For GO terms the backend currently returns duplicates, so we need
  // to only use unique values
  const uniqueReferences = uniq(references);
  const groupedReferences =
    uniqueReferences &&
    groupBy(uniqueReferences, (reference: Evidence) => reference.source);
  // TODO it looks like there's more source types than defined here
  return (
    <div>
      <h5>{evidenceData.label}</h5>
      {groupedReferences &&
        groupedReferences.get(evidenceTagSourceTypes.PUBMED) && (
          <UniProtKBEntryPublications
            pubmedIds={
              groupedReferences
                .get(evidenceTagSourceTypes.PUBMED)
                .map((reference: Evidence) => reference.id)
                .filter((id: string) => id) as string[]
            }
          />
        )}
      {groupedReferences &&
        groupedReferences.get(evidenceTagSourceTypes.UNIPROT) && (
          <Fragment>
            {groupedReferences
              .get(evidenceTagSourceTypes.UNIPROT)
              .map((reference: Evidence) => (
                <Link to={`/uniprotkb/${reference.id}`} key={reference.id}>
                  {reference.id}
                </Link>
              ))}
          </Fragment>
        )}
      {groupedReferences &&
        groupedReferences.get(evidenceTagSourceTypes.PROSITE_PRORULE) && (
          <Fragment>
            {groupedReferences
              .get(evidenceTagSourceTypes.PROSITE_PRORULE)
              .map((reference: Evidence) => (
                <a
                  href={`//prosite.expasy.org/unirule/${reference.id}`}
                  key={reference.id}
                >
                  {reference.id}
                </a>
              ))}
          </Fragment>
        )}
    </div>
  );
};

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
  const size = 12;
  const evidenceMap: Map<string, Evidence[]> = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Array.from(evidenceMap.keys()).map(evidenceCode => {
    if (!evidenceCode) {
      return html``;
    }
    const evidenceData = getEvidenceCodeData(evidenceCode);
    if (!evidenceData) {
      // Unlike React, lit-html always expects an html template, not null.
      return html``;
    }
    const references = evidenceMap.get(evidenceCode);
    return html`
      <span
        class=${`evidence-tag ${
          evidenceData.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
        }`}
        @click=${() => callback(evidenceData, references)}
      >
        ${unsafeHTML(
          ReactDOMServer.renderToStaticMarkup(
            evidenceData.manual ? (
              <SwissProtIcon width={size} height={size} />
            ) : (
              <TremblIcon width={size} height={size} />
            )
          )
        )}
        ${evidenceData.labelRender
          ? evidenceData.labelRender(references)
          : evidenceData.label}</span
      >
    `;
  });
  return evidenceTags;
};

export default UniProtEvidenceTag;
