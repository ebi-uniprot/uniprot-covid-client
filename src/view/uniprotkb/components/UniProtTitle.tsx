import React, { FC, Fragment } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { EntryType } from '../../../model/uniprotkb/UniProtkbConverter';
import './styles/UniProtTitle.scss';

export const ReviewedUnreviewed: FC<{ entryType: EntryType }> = ({
  entryType,
}) => (
  <Fragment>
    {entryType === EntryType.SWISSPROT ? (
      <span className="uniprot-title__status icon--reviewed">
        <SwissProtIcon />
      </span>
    ) : (
      <span className="uniprot-title__status icon--unreviewed">
        <TremblIcon />
      </span>
    )}
  </Fragment>
);

const UniProtTitle: FC<{
  primaryAccession: string;
  entryType: EntryType;
  uniProtId: string;
}> = ({ primaryAccession, entryType, uniProtId }) => (
  <div className="uniprot-title">
    <ReviewedUnreviewed entryType={entryType} />
    <Link to={`/uniprotkb/${primaryAccession}`}>{primaryAccession}</Link>
    {` · ${uniProtId}`}
  </div>
);

export default UniProtTitle;
