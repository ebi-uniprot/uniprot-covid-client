import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import EntryPublications from './EntryPublications';
import * as entryActions from '../state/entryActions';
import { RootAction, RootState } from '../../state/state-types';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import apiUrls from '../../utils/apiUrls';

const EntryPublicationsContainer: FC<{
  accession: string;
  dispatchFetchEntryPublications: (url: string) => void;
  publicationsData: {
    data: LiteratureForProteinAPI[] | null;
    nextUrl: string;
    total: number;
  };
}> = ({ accession, dispatchFetchEntryPublications, publicationsData }) => {
  useEffect(() => {
    const url = apiUrls.entryPublications(accession);
    dispatchFetchEntryPublications(url);
  }, [accession, dispatchFetchEntryPublications]);

  return (
    <EntryPublications
      accession={accession}
      data={publicationsData.data}
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPublicationsContainer);
