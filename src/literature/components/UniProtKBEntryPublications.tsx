import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { Publication } from 'franklin-sites';
import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { RootState } from '../../state/state-types';

const UniProtKBEntryPublications: FC<{
  pubmedIds: string[];
  entryData: UniProtkbAPIModel | null;
}> = ({ pubmedIds, entryData }) => {
  if (!entryData) {
    return null;
  }

  const references =
    entryData.references &&
    entryData.references.filter(
      ({ citation }) =>
        citation.citationXrefs &&
        citation.citationXrefs.some(({ id }) => id && pubmedIds.includes(id))
    );
  return (
    <Fragment>
      {references &&
        references.map(({ citation }) => (
          <Publication
            title={citation.title}
            authors={citation.authors}
            key={citation.title}
            journalInfo={{
              firstPage: citation.firstPage,
              journal: citation.journal,
              lastPage: citation.lastPage,
              publicationDate: citation.publicationDate,
              volume: citation.volume,
            }}
          />
        ))}
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  entryData: state.entry.data,
});

export default connect(mapStateToProps)(UniProtKBEntryPublications);
