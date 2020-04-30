import React, { FC, Fragment } from 'react';
import { Publication, Loader, Message } from 'franklin-sites';
import { getPublicationsURL } from '../apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { MessageLevel } from '../../messages/types/messagesTypes';
import { LiteratureAPI } from '../types/LiteratureTypes';

const UniProtKBEntryPublications: FC<{
  pubmedIds: string[];
}> = ({ pubmedIds }) => {
  const url = getPublicationsURL(pubmedIds);
  const { loading, data, status, error } = useDataApi(url);

  if (error) {
    return (
      <Message level={MessageLevel.FAILURE}>
        {status}: {error.message}
      </Message>
    );
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { results }: { results: LiteratureAPI[] } = data.results;

  return (
    <Fragment>
      {results &&
        results.map(({ citation }) => (
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

export default UniProtKBEntryPublications;
