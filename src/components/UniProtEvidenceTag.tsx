import React, { FC, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import { groupBy } from 'lodash';
import { EvidenceTag, SwissProtIcon, TremblIcon } from 'franklin-sites';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Link } from 'react-router-dom';
import {
  getEvidenceCodeData,
  EvidenceData,
} from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';
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
  const groupedReferences =
    references &&
    groupBy(references, (reference: Evidence) => reference.source);
  // TODO it looks like there's more source types than defined here
  return (
    <div>
      <h5>{evidenceData.label}</h5>
      {groupedReferences &&
        groupedReferences[evidenceTagSourceTypes.PUBMED] && (
          <UniProtKBEntryPublications
            pubmedIds={
              groupedReferences[evidenceTagSourceTypes.PUBMED]
                .map((reference: Evidence) => reference.id)
                .filter((id?: string) => id) as string[]
            }
          />
        )}
      {groupedReferences && groupedReferences[evidenceTagSourceTypes.UNIPROT] && (
        <Fragment>
          {groupedReferences[evidenceTagSourceTypes.UNIPROT].map(
            ({ id }: Evidence) => (
              <Link to={`/uniprotkb/${id}`} key={id}>
                {id}
              </Link>
            )
          )}
        </Fragment>
      )}
      {groupedReferences &&
        groupedReferences[evidenceTagSourceTypes.PROSITE_PRORULE] && (
          <Fragment>
            {groupedReferences[evidenceTagSourceTypes.PROSITE_PRORULE].map(
              ({ id }: Evidence) => (
                <a href={`//prosite.expasy.org/unirule/${id}`} key={id}>
                  {id}
                </a>
              )
            )}
          </Fragment>
        )}
    </div>
  );
};

const UniProtEvidenceTag: FC<{ evidences: Evidence[] }> = ({ evidences }) => {
  const evidenceObj = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Object.entries(evidenceObj).map(
    ([evidenceCode, references]) => {
      const evidenceData = getEvidenceCodeData(evidenceCode);
      if (!evidenceData) {
        return null;
      }
      return (
        <EvidenceTag
          label={
            evidenceData.labelRender
              ? evidenceData.labelRender(references)
              : evidenceData.label
          }
          iconComponent={
            evidenceData.manual ? <SwissProtIcon /> : <TremblIcon />
          }
          className={
            evidenceData.manual
              ? 'svg-colour-reviewed'
              : 'svg-colour-unreviewed'
          }
          key={evidenceCode}
        >
          <UniProtEvidenceTagContent
            evidenceData={evidenceData}
            references={references}
          />
        </EvidenceTag>
      );
    }
  );
  return <Fragment>{evidenceTags}</Fragment>;
};

export const UniProtProtvistaEvidenceTag = (
  evidences: Evidence[],
  callback: Function
) => {
  const size = 12;
  const evidenceObj = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Object.entries(evidenceObj).map(
    ([evidenceCode, references]) => {
      if (!evidenceCode) {
        return html``;
      }
      const evidenceData = getEvidenceCodeData(evidenceCode);
      if (!evidenceData) {
        // Unlike React, lit-html always expects an html template, not null.
        return html``;
      }
      return html`
        <span
          class=${`evidence-tag ${
            evidenceData.manual
              ? 'svg-colour-reviewed'
              : 'svg-colour-unreviewed'
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
    }
  );
  return evidenceTags;
};

export default UniProtEvidenceTag;
