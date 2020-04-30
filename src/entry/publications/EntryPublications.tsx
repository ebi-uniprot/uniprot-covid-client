import React, { FC } from 'react';
import { uniq } from 'lodash';
import { Loader, Publication, DataList } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { getUniProtPublicationsQueryUrl } from '../../utils/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import ErrorHandler from '../../pages/errors/ErrorHandler';
import { SelectedFacet } from '../../results/types/resultsTypes';

const EntryPublications: FC<{
  accession: string;
  selectedFacets: SelectedFacet[];
}> = ({ accession, selectedFacets }) => {
  const url = getUniProtPublicationsQueryUrl(accession, selectedFacets);
  const { loading, data, status, error } = useDataApi(url);
  //   data: LiteratureForProteinAPI[] | null;

  // publicationsData.nextUrl

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { results } = data;
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

            const pubMedXref =
              citation.citationXrefs &&
              citation.citationXrefs.find(
                (xref) => xref.databaseType === 'PubMed'
              );

            const doiXref =
              citation.citationXrefs &&
              citation.citationXrefs.find(
                (xref) => xref.databaseType === 'DOI'
              );

            const pubmedId = pubMedXref && pubMedXref.id;

            const journalInfo = {
              journal: citation.journal,
              volume: citation.volume,
              firstPage: citation.firstPage,
              lastPage: citation.lastPage,
              publicationDate: citation.publicationDate,
              doiId: doiXref && doiXref.id,
            };

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
          onLoadMoreItems={() => console.log('loading more')}
          hasMoreData={data.total > data.length}
        />
      </div>
    </section>
  );
};

export default EntryPublications;
