import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import Comment from '../../../model/types/Comment';
import { EvidenceType } from '../../../model/types/modelTypes';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import {
  databaseCategoryToString,
  databaseToDatabaseInfo,
} from '../../../data/database';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Xref } from '../../../model/utils/XrefUtils';
import { XRefExternalLink } from './XRefView';

type DiseaseType = {
  diseaseId?: string;
  diseaseAccession?: string;
  acronym?: string;
  description?: string;
  reference?: Xref;
  evidences?: EvidenceType[];
};

export type DiseaseCommentData = {
  commentType?: Comment;
  disease?: DiseaseType;
  note?: { texts?: { value?: string }[] };
}[];

type DiseaseInvolvementEntryProps = {
  comment: DiseaseCommentData[0];
  accession: string;
};

type DiseaseInvolvementProps = {
  comments?: DiseaseCommentData;
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
          <ExpandableList descriptionString="notes">
            {texts.map(text => ({
              id: v1(),
              content: text.value,
            }))}
          </ExpandableList>
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

export const DiseaseInvolvementView: React.FC<DiseaseInvolvementProps> = ({
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

export default DiseaseInvolvementView;
