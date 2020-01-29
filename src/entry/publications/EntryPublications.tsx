import React, { FC } from 'react';
import { Loader, Publication, DataList, Facets } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { Facet } from '../../results/ResultsContainer';
import { SelectedFacet } from '../../results/types/resultsTypes';

const EntryPublications: FC<{
  accession: string;
  data: LiteratureForProteinAPI[] | null;
  facets: Facet[];
  selectedFacets: SelectedFacet[];
  setSelectedFacets: (facets: SelectedFacet[]) => void;
  total: number;
  handleLoadMoreItems: () => void;
}> = ({
  accession,
  data,
  facets,
  selectedFacets,
  setSelectedFacets,
  total,
  handleLoadMoreItems,
}) => {
  if (!data || data.length <= 0) {
    return <Loader />;
  }

  const addFacet = (name: string, value: string) => {
    selectedFacets.find(facet => facet.name === name);
    setSelectedFacets([...selectedFacets, { name, value }]);
  };

  const removeFacet = (name: string, value: string) => {
    setSelectedFacets(
      selectedFacets.filter(
        selectedFacet =>
          !(selectedFacet.name === name && selectedFacet.value === value)
      )
    );
  };

  return (
    <section>
      <h2>Publications for {accession}</h2>
      <Facets
        data={facets}
        addFacet={addFacet}
        removeFacet={removeFacet}
        selectedFacets={selectedFacets}
      />
      <div style={{ height: '70vh', overflow: 'auto' }}>
        <DataList
          idKey="primaryAccession"
          data={data}
          dataRenderer={(publicationData: LiteratureForProteinAPI) => {
            if (!publicationData.uniProtReference) {
              // Mapped Reference
              console.log(publicationData);
            }
            let infoListData;
            if (publicationData.uniProtReference) {
              infoListData = [
                {
                  title: 'Cited for',
                  content: publicationData.uniProtReference.referencePositions,
                },
                {
                  title: 'Tissue',
                  content: (
                    <ul className="no-bullet">
                      {publicationData.uniProtReference.referenceComments &&
                        publicationData.uniProtReference.referenceComments.map(
                          comment => <li>{comment.value}</li>
                        )}
                    </ul>
                  ),
                },
                {
                  title: 'Categories',
                  content: (
                    <ul className="no-bullet">
                      {publicationData.categories &&
                        publicationData.categories.map(category => (
                          <li>{category}</li>
                        ))}
                    </ul>
                  ),
                },
                {
                  title: 'Source',
                  content: publicationData.publicationSource,
                },
              ];
            }
            if (publicationData.literatureEntry) {
              return (
                <Publication
                  {...publicationData.literatureEntry}
                  abstract={publicationData.literatureEntry.literatureAbstract}
                  infoData={infoListData}
                  statistics={
                    publicationData.literatureEntry.statistics &&
                    publicationData.literatureEntry.statistics
                      .reviewedProteinCount
                  }
                />
              );
            }
            return (
              publicationData.uniProtReference && (
                <Publication
                  {...publicationData.uniProtReference.citation}
                  infoData={infoListData}
                />
              )
            );
          }}
          onLoadMoreItems={handleLoadMoreItems}
          hasMoreData={total > data.length}
        />
      </div>
    </section>
  );
};

export default EntryPublications;
