import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  UniProtkbAPIModel,
  Citation,
} from '../../model/uniprotkb/UniProtkbConverter';
import { RootState } from '../../state/state-types';

const Publication: FC<{ publication: Citation }> = ({ publication }) => (
  <div>
    <h4>{publication.citation.title}</h4>
    <p>
      {publication.citation.authors &&
        publication.citation.authors
          .map<React.ReactNode>(author => (
            <Link to="/" key={author}>
              {author}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
    </p>
  </div>
);

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
          <Publication publication={reference} key={reference.citation.title} />
        ))}
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  entryData: state.entry.data,
});

export default connect(mapStateToProps)(UniProtKBEntryPublications);
