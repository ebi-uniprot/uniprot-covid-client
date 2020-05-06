import React, { FC, Fragment } from 'react';
import { Publication, Loader, Message } from 'franklin-sites';
import useDataApi from '../../../shared/hooks/useDataApi';
import { getPublicationsURL } from '../../config/apiUrls';
import { MessageLevel } from '../../../messages/types/messagesTypes';
import { LiteratureAPI } from '../../types/LiteratureTypes';
import formatCitationData from '../../adapters/LiteratureConverter';

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

  const { results }: { results: LiteratureAPI[] } = data;
  return (
    <Fragment>
      {results &&
        results
          .map(literatureItem => ({
            ...literatureItem,
            ...formatCitationData(literatureItem.citation),
          }))
          .map(({ citation, statistics, pubmedId, journalInfo }) => (
            <Publication
              title={citation.title}
              authors={citation.authors}
              key={`${citation.title}-${citation.citationType}-${citation.journal}`}
              pubmedId={pubmedId}
              statistics={statistics}
              journalInfo={journalInfo}
            />
          ))}
    </Fragment>
  );
};

export default UniProtKBEntryPublications;
