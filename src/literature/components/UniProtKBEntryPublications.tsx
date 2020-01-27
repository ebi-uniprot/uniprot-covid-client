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
      reference =>
        reference.citation.citationXrefs &&
        reference.citation.citationXrefs.some(
          citation => citation.id && pubmedIds.includes(citation.id)
        )
    );
  return (
    <Fragment>
      {references &&
        references.map(reference => (
          <Publication
            title={reference.citation.title}
            authors={reference.citation.authors}
            key={reference.citation.title}
            journalInfo={{
              firstPage: reference.citation.firstPage,
              journal: reference.citation.journal,
              lastPage: reference.citation.lastPage,
              publicationDate: reference.citation.publicationDate,
              volume: reference.citation.volume,
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
