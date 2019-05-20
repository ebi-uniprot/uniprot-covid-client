import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import CommentType from './types/CommentType';
import { EvidenceType } from './types/modelTypes';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { DatabaseToDatabaseInfo } from './types/DatabaseTypes';
import databaseToDatabaseInfoJson from '../data/databaseToDatabaseInfo.json';
import { DatabaseCrossReference, XRefExternalLink } from './XRef';
import { InfoList } from 'franklin-sites';

const databaseToDatabaseInfo: DatabaseToDatabaseInfo = databaseToDatabaseInfoJson;

type DiseaseType = {
  diseaseId?: string;
  diseaseAccession?: string;
  acronym?: string;
  description?: string;
  reference?: DatabaseCrossReference;
  evidences?: EvidenceType[];
};

export type DiseaseCommentData = {
  commentType?: CommentType.DISEASE;
  disease?: DiseaseType;
  note?: { texts?: { value?: string }[] };
}[];

type DiseaseInvolvementEntryProps = {
  comment: DiseaseCommentData[0];
  accession: string;
};

type DiseaseInvolvementProps = {
  comments: DiseaseCommentData;
  primaryAccession: string;
};

export const DiseaseInvolvementEntry: React.FC<
  DiseaseInvolvementEntryProps
> = ({ comment, accession }) => {
  const { disease, note } = comment;
  if (!disease) {
    return null;
  }
  const {
    diseaseId,
    acronym = '',
    evidences,
    description,
    reference,
  } = disease;
  if (!diseaseId) {
    return null;
  }
  const infoData = [];

  const evidenceNodes =
    evidences &&
    evidences.map(evidence => (
      <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
    ));

  if (note) {
    const { texts } = note;
    if (texts) {
      infoData.push({
        title: 'Note',
        content: (
          <ul className="no-bullet">
            {texts.map(text => (
              <li key={v1()}>{text.value}</li>
            ))}
          </ul>
        ),
      });
    }
  }

  if (description) {
    infoData.push({
      title: 'Description',
      content: description,
    });
  }

  if (reference) {
    const { databaseType: database, id } = reference;
    if (database && id && databaseToDatabaseInfo[database]) {
      const info = databaseToDatabaseInfo[database];
      infoData.push({
        title: 'See also',
        content: (
          <XRefExternalLink url={info.uriLink} id={id} accession={accession}>
            {info.displayName}
            {id && `:${id}`}
          </XRefExternalLink>
        ),
      });
    }
  }
  return (
    <Fragment>
      <h4>
        {diseaseId} {acronym && `(${acronym})`}
      </h4>
      <p>{evidenceNodes}</p>
      <InfoList infoData={infoData} />
    </Fragment>
  );
};

export const DiseaseInvolvement: React.FC<DiseaseInvolvementProps> = ({
  comments,
  primaryAccession: accession,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const nodes = comments.map(comment => (
    <DiseaseInvolvementEntry
      key={v1()}
      comment={comment}
      accession={accession}
    />
  ));
  return (
    <Fragment>
      <h3>Involvment in disease</h3>
      {nodes}
    </Fragment>
  );
};

export default DiseaseInvolvement;
