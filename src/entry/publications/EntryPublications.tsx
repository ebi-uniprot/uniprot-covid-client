import React, { FC, useState } from 'react';
import { uniq } from 'lodash';
import { Loader, Publication, DataList } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { getUniProtPublicationsQueryUrl } from '../../utils/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import ErrorHandler from '../../pages/errors/ErrorHandler';
import { SelectedFacet } from '../../results/types/resultsTypes';
import formatCitationData from '../../literature/adapters/LiteratureConverter';
import getNextUrlFromResponse from '../../utils/queryUtils';

const EntryPublications: FC<{
  accession: string;
  selectedFacets: SelectedFacet[];
}> = ({ accession, selectedFacets }) => {
  const [url, setUrl] = useState(
    getUniProtPublicationsQueryUrl(accession, selectedFacets)
  );
  const { loading, data, status, error, headers } = useDataApi(url);

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { results } = data;
  const total = headers['x-totalrecords'];
  const nextUrl = getNextUrlFromResponse(headers.link);

  return (
    <section>
      <div style={{ height: '80vh' }}>
        <h2>Publications for {accession}</h2>
        {/* The height css will be removed after Franklin DataList is updated */}
        {/* TODO could idKey be a callback on the item? */}
        <DataList
          idKey="id"
          data={results}
          dataRenderer={({
            reference,
            publicationSource,
            statistics,
            categories,
          }: LiteratureForProteinAPI) => {
            const {
              citation,
              referencePositions,
              referenceComments,
            } = reference;

            const { pubmedId, journalInfo } = formatCitationData(citation);

            const infoListData = [
              {
                title: 'Cited for',
                content: referencePositions,
              },
              {
                title: 'Tissue',
                content: referenceComments && (
                  <ul className="no-bullet">
                    {referenceComments.map((comment) => (
                      <li key={comment.value}>{comment.value}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Categories',
                content: categories && (
                  <ul className="no-bullet">
                    {uniq(categories).map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Source',
                content: publicationSource,
              },
            ];
            return (
              reference && (
                <Publication
                  {...citation}
                  abstract={citation.literatureAbstract}
                  infoData={infoListData}
                  statistics={statistics}
                  pubmedId={pubmedId}
                  journalInfo={journalInfo}
                />
              )
            );
          }}
          onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
          hasMoreData={total > results.length}
        />
      </div>
    </section>
  );
};

export default EntryPublications;
