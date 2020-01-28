import React, { FC } from 'react';
import { Loader, Publication, DataList } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';

const EntryPublications: FC<{
  accession: string;
  data: LiteratureForProteinAPI[] | null;
  total: number;
  handleLoadMoreItems: () => void;
}> = ({ accession, data, total, handleLoadMoreItems }) => {
  if (!data) {
    return <Loader />;
  }
  return (
    <section>
      <h2>Publications for {accession}</h2>
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
