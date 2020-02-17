import React, { useEffect, useState, Fragment } from 'react';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import { InPageNav, Loader, DisplayMenu } from 'franklin-sites';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import uniProtKbConverter, {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { hasContent, hasExternalLinks } from '../model/utils/utils';
import EntrySection from '../model/types/EntrySection';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';
import { RootState, RootAction } from '../state/state-types';
import * as entryActions from './state/entryActions';
import { getUniProtPublicationsQueryUrl } from '../utils/apiUrls';
import { SelectedFacet } from '../results/types/resultsTypes';
import EntryPublicationsFacets from './publications/EntryPublicationsFacets';
import EntryPublications from './publications/EntryPublications';
import { LiteratureForProteinAPI } from '../literature/types/LiteratureTypes';
import SideBarLayout from '../layout/SideBarLayout';
import { Facet } from '../types/responseTypes';

type MatchParams = {
  accession: string;
  path: string;
};

type EntryProps = RouteComponentProps<MatchParams> & {
  entryData: UniProtkbAPIModel | null;
  publicationsData: {
    data: LiteratureForProteinAPI[] | null;
    facets: Facet[];
    nextUrl: string;
    total: number;
  };
  dispatchFetchEntry: (accesion: string) => void;
  dispatchFetchEntryPublications: (url: string, reset?: boolean) => void;
  dispatchResetEntry: () => void;
};

const Entry: React.FC<EntryProps> = ({
  match,
  entryData,
  publicationsData,
  dispatchFetchEntry,
  dispatchFetchEntryPublications,
  dispatchResetEntry,
}) => {
  const { path, params } = match;
  const { accession } = params;
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacet[]>([]);

  useEffect(() => {
    dispatchFetchEntry(accession);
    return function cleanup() {
      dispatchResetEntry();
    };
  }, [accession, dispatchFetchEntry, dispatchResetEntry]);

  useEffect(() => {
    const url = getUniProtPublicationsQueryUrl(accession, selectedFacets);
    dispatchFetchEntryPublications(url);
  }, [accession, dispatchFetchEntryPublications, selectedFacets]);

  if (!entryData || Object.keys(entryData).length === 0) {
    return <Loader />;
  }
  const transformedData: UniProtkbUIModel = uniProtKbConverter(entryData);

  const sections = UniProtKBEntryConfig.map(section => ({
    label: section.name,
    id: section.name,

    disabled:
      section.name === EntrySection.ExternalLinks
        ? !hasExternalLinks(transformedData)
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          !hasContent((transformedData as any)[section.name]),
  }));

  const displayMenuData = [
    {
      name: 'Entry',
      itemContent: <InPageNav sections={sections} />,
      path: 'main',
      mainContent: <EntryMain transformedData={transformedData} />,
    },
    {
      name: 'Publications',
      path: 'publications',
      itemContent: (
        <EntryPublicationsFacets
          facets={publicationsData.facets}
          selectedFacets={selectedFacets}
          setSelectedFacets={setSelectedFacets}
        />
      ),
      mainContent: (
        <EntryPublications
          accession={accession}
          data={publicationsData.data}
          total={publicationsData.total}
          handleLoadMoreItems={() => {
            dispatchFetchEntryPublications(publicationsData.nextUrl, false);
          }}
        />
      ),
    },
    {
      name: 'External links',
      path: 'external-links',
      mainContent: <EntryExternalLinks transformedData={transformedData} />,
    },
  ];

  return (
    <Fragment>
      <SideBarLayout
        sidebar={
          <DisplayMenu
            data={displayMenuData}
            title={`Publications for ${accession}`}
          />
        }
      >
        <Switch>
          {displayMenuData.map(displayItem => (
            <Route
              path={`${path}/${displayItem.path}`}
              render={() => <Fragment>{displayItem.mainContent}</Fragment>}
              key={displayItem.name}
            />
          ))}
        </Switch>
      </SideBarLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    entryData: state.entry.data,
    publicationsData: state.entry.publicationsData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchEntry: (accession: string) =>
        entryActions.fetchEntryIfNeeded(accession),
      dispatchResetEntry: () => entryActions.resetEntry(),
      dispatchFetchEntryPublications: (accession: string, reset?: boolean) =>
        entryActions.fetchEntryPublicationsIfNeeded(accession, reset),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));
