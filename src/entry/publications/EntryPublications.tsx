import React, { FC } from 'react';
import { Loader, Publication, DataList, Facets } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { Facet } from '../../results/ResultsContainer';
import { SelectedFacet } from '../../results/types/resultsTypes';
import SideBarLayout from '../../layout/SideBarLayout';
import { uniq } from '../../utils/utils';

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
      <SideBarLayout
        sidebar={
          <Facets
            data={facets}
            addFacet={addFacet}
            removeFacet={removeFacet}
            selectedFacets={selectedFacets}
          />
        }
      >
        <div style={{ height: '80vh', overflow: 'auto' }}>
          <DataList
            idKey="id"
            data={data}
            dataRenderer={(publicationData: LiteratureForProteinAPI) => {
              let infoListData;
              if (publicationData.literatureMappedReference) {
                infoListData = [
                  {
                    title: 'Annotation',
                    content:
                      publicationData.literatureMappedReference.annotation,
                  },
                  {
                    title: 'Mapping Source',
                    content: `${publicationData.literatureMappedReference.source}:${publicationData.literatureMappedReference.sourceId}`,
                  },
                  {
                    title: 'Source',
                    content: publicationData.publicationSource,
                  },
                ];
              } else if (publicationData.uniProtReference) {
                infoListData = [
                  {
                    title: 'Cited for',
                    content:
                      publicationData.uniProtReference.referencePositions,
                  },
                  {
                    title: 'Tissue',
                    content: publicationData.uniProtReference
                      .referenceComments && (
                      <ul className="no-bullet">
                        {publicationData.uniProtReference.referenceComments.map(
                          comment => (
                            <li key={comment.value}>{comment.value}</li>
                          )
                        )}
                      </ul>
                    ),
                  },
                  {
                    title: 'Categories',
                    content: publicationData.categories && (
                      <ul className="no-bullet">
                        {uniq(publicationData.categories).map(category => (
                          <li key={category}>{category}</li>
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
                    abstract={
                      publicationData.literatureEntry.literatureAbstract
                    }
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
      </SideBarLayout>
    </section>
  );
};

export default EntryPublications;
