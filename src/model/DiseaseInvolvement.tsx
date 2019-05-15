import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import CommentType from './types/commentType';
import { EvidenceType } from './types/modelTypes';
import UniProtEvidenceTag from '../components/UniProtEvidenceTag';
import { DatabaseToDatabaseInfo } from './types/databaseTypes';
import databaseToDatabaseInfoJson from '../data/databaseToDatabaseInfo.json';
import { DatabaseCrossReference, XRefExternalLink } from './XRef';

const databaseToDatabaseInfo: DatabaseToDatabaseInfo = databaseToDatabaseInfoJson;

type DiseaseType = {
  diseaseId?: string;
  diseaseAccession?: string;
  acronym?: string;
  description?: string;
  reference?: DatabaseCrossReference;
  evidences?: EvidenceType[];
};

export type DiseaseCommentType = {
  commentType?: CommentType.DISEASE;
  disease?: DiseaseType;
  note?: { texts?: { value?: string }[] };
};

type DiseaseInvolvementEntryProps = {
  comment: DiseaseCommentType;
  accession: string;
};

type DiseaseInvolvementProps = {
  data: {
    comments?: DiseaseCommentType[];
    primaryAccession: string;
  };
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
  const evidenceNodes =
    evidences &&
    evidences.map(evidence => (
      <UniProtEvidenceTag evidence={evidence} key={evidence.id} />
    ));

  let notesNode;
  if (note) {
    const { texts } = note;
    if (texts) {
      notesNode = texts.map(text => text.value).join(' ');
    }
  }

  let descriptionNode;
  if (description) {
    descriptionNode = (
      <Fragment>
        <u>Disease description</u> {description}
      </Fragment>
    );
  }

  let referenceNode;
  if (reference) {
    const { databaseType: database, id } = reference;
    if (database && id && databaseToDatabaseInfo[database]) {
      const info = databaseToDatabaseInfo[database];
      const idNode = id && `:${id}`;
      referenceNode = (
        <XRefExternalLink url={info.uriLink} id={id} accession={accession}>
          {`See also ${info.displayName}${idNode}`}
        </XRefExternalLink>
      );
    }
  }
  return (
    <Fragment>
      <h5>
        {diseaseId} {acronym && `(${acronym})`} {evidenceNodes}
      </h5>
      <p>
        {notesNode}
        <br />
        {descriptionNode}
        <br />
        {referenceNode}
      </p>
    </Fragment>
  );
};

export const DiseaseInvolvement: React.FC<DiseaseInvolvementProps> = ({
  data,
}) => {
  const { comments, primaryAccession: accession } = data;
  const isDisease = (comment: DiseaseCommentType) =>
    comment.commentType === CommentType.DISEASE;
  if (!comments || !comments.some(isDisease)) {
    return null;
  }
  const nodes = comments
    .filter(isDisease)
    .map(comment => (
      <DiseaseInvolvementEntry
        key={v1()}
        comment={comment}
        accession={accession}
      />
    ));
  return (
    <Fragment>
      <h4>Involvment in disease</h4>
      {nodes}
    </Fragment>
  );
};

export default DiseaseInvolvement;
