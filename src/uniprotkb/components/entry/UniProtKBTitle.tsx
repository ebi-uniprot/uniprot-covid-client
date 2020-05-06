import React, { FC } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';
import { EntryType } from '../../adapters/UniProtkbConverter';
import './styles/UniProtKBTitle.scss';

export const ReviewedUnreviewed: FC<{ entryType: EntryType }> = ({
  entryType,
}) =>
  entryType === EntryType.SWISSPROT ? (
    <span className="uniprot-title__status icon--reviewed">
      <SwissProtIcon />
    </span>
  ) : (
    <span className="uniprot-title__status icon--unreviewed">
      <TremblIcon />
    </span>
  );

const UniProtKBTitle: FC<{
  primaryAccession: string;
  entryType: EntryType;
  uniProtkbId: string;
}> = ({ primaryAccession, entryType, uniProtkbId }) => (
  <span className="uniprot-title">
    <ReviewedUnreviewed entryType={entryType} />
    {primaryAccession}
    {` · ${uniProtkbId}`}
  </span>
);

export default UniProtKBTitle;
