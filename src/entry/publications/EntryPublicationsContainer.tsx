import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import EntryPublications from './EntryPublications';
import * as entryActions from '../state/entryActions';
import { RootAction, RootState } from '../../state/state-types';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { getUniProtPublicationsQueryUrl } from '../../utils/apiUrls';
import { Facet } from '../../results/ResultsContainer';

type SelectedFacet = {
  name: string;
  value: string;
};

const EntryPublicationsContainer: FC<{
  accession: string;
  dispatchFetchEntryPublications: (url: string) => void;
  dispatchResetEntryPublications: () => void;
  publicationsData: {
    data: LiteratureForProteinAPI[] | null;
    facets: Facet[];
    nextUrl: string;
    total: number;
  };
}> = ({
  accession,
  dispatchFetchEntryPublications,
  dispatchResetEntryPublications,
  publicationsData,
}) => {
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacet[]>([]);

  useEffect(() => {
    const url = getUniProtPublicationsQueryUrl(accession, selectedFacets);
    dispatchFetchEntryPublications(url);
    return () => dispatchResetEntryPublications();
  }, [
    accession,
    selectedFacets,
    dispatchFetchEntryPublications,
    dispatchResetEntryPublications,
  ]);

  return (
    <EntryPublications
      accession={accession}
      data={publicationsData.data}
      facets={publicationsData.facets}
      selectedFacets={selectedFacets}
      setSelectedFacets={setSelectedFacets}
      total={publicationsData.total}
      handleLoadMoreItems={() => {
        dispatchFetchEntryPublications(publicationsData.nextUrl);
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  publicationsData: state.entry.publicationsData,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchEntryPublications: (accession: string) =>
        entryActions.fetchEntryPublicationsIfNeeded(accession),
      dispatchResetEntryPublications: () =>
        entryActions.resetEntryPublications(),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPublicationsContainer);
