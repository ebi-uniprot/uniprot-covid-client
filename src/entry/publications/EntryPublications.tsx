import React, { FC } from 'react';
import { uniq } from 'lodash';
import { Loader, Publication, DataList } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';

const EntryPublications: FC<{
  accession: string;
  data: LiteratureForProteinAPI[] | null;
  total: number;
  handleLoadMoreItems: () => void;
}> = ({ accession, data, total, handleLoadMoreItems }) => {
  if (!data || data.length === 0) {
    return <Loader />;
  }

  return (
    <section>
      <div style={{ height: '80vh' }}>
        <h2>Publications for {accession}</h2>
        {/* The height css will be removed after Franklin DataList is updated */}
        <DataList
          idKey="id"
          data={data}
          dataRenderer={({
            literatureMappedReference,
            publicationSource,
            uniProtReference,
            categories,
            literatureEntry,
          }: LiteratureForProteinAPI) => {
            let infoListData;
            if (literatureMappedReference) {
              const {
                annotation,
                source,
                sourceId,
              } = literatureMappedReference;
              infoListData = [
                {
                  title: 'Annotation',
                  content: annotation,
                },
                {
                  title: 'Mapping Source',
                  content: `${source}:${sourceId}`,
                },
                {
                  title: 'Source',
                  content: publicationSource,
                },
              ];
            } else if (uniProtReference) {
              const {
                referencePositions,
                referenceComments,
              } = uniProtReference;
              infoListData = [
                {
                  title: 'Cited for',
                  content: referencePositions,
                },
                {
                  title: 'Tissue',
                  content: referenceComments && (
                    <ul className="no-bullet">
                      {referenceComments.map(comment => (
                        <li key={comment.value}>{comment.value}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: 'Categories',
                  content: categories && (
                    <ul className="no-bullet">
                      {uniq(categories).map(category => (
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
            }
            if (literatureEntry) {
              const { literatureAbstract, statistics } = literatureEntry;
              return (
                <Publication
                  {...literatureEntry}
                  abstract={literatureAbstract}
                  infoData={infoListData}
                  statistics={statistics && statistics}
                />
              );
            }
            return (
              uniProtReference && (
                <Publication
                  {...uniProtReference.citation}
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
