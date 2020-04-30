import React, { useEffect, useState, Fragment } from 'react';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import {
  InPageNav,
  Loader,
  DisplayMenu,
  PublicationIcon,
  ExternalLinkIcon,
  TremblIcon,
  DownloadIcon,
  DropdownButton,
  ProtVistaIcon,
} from 'franklin-sites';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import uniProtKbConverter, {
  EntryType,
  UniProtkbInactiveEntryModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { hasContent, hasExternalLinks } from '../model/utils/utils';
import EntrySection from '../model/types/EntrySection';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';
import { RootState, RootAction } from '../state/state-types';
import * as entryActions from './state/entryActions';
import apiUrls, { getUniProtPublicationsQueryUrl } from '../utils/apiUrls';
import {
  SelectedFacet,
  fileFormatEntryDownload,
} from '../results/types/resultsTypes';
import EntryPublicationsFacets from './publications/EntryPublicationsFacets';
import EntryPublications from './publications/EntryPublications';
import { LiteratureForProteinAPI } from '../literature/types/LiteratureTypes';
import SideBarLayout from '../layout/SideBarLayout';
import { Facet } from '../types/responseTypes';
import BaseLayout from '../layout/BaseLayout';
import ObsoleteEntryPage from '../pages/errors/ObsoleteEntryPage';
import FeatureViewer from './FeatureViewer';
import useDataApi from '../hooks/useDataApi';

type MatchParams = {
  accession: string;
  path: string;
};

type EntryProps = RouteComponentProps<MatchParams> & {
  publicationsData: {
    data: LiteratureForProteinAPI[] | null;
    facets: Facet[];
    nextUrl: string;
    total: number;
  };
  dispatchFetchEntryPublications: (url: string, reset?: boolean) => void;
};

const Entry: React.FC<EntryProps> = ({
  match,
  publicationsData,
  dispatchFetchEntryPublications,
}) => {
  const { path, params } = match;
  const { accession } = params;
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacet[]>([]);

  const { loading, data, status, statusText, headers } = useDataApi(
    apiUrls.entry(accession)
  );

  useEffect(() => {
    const url = getUniProtPublicationsQueryUrl(accession, selectedFacets);
    dispatchFetchEntryPublications(url);
  }, [accession, dispatchFetchEntryPublications, selectedFacets]);

  if (loading || !data) {
    return <Loader />;
  }

  if (data && data.entryType === EntryType.INACTIVE) {
    const inactiveEntryData: UniProtkbInactiveEntryModel = data as UniProtkbInactiveEntryModel;

    return (
      <BaseLayout>
        <ObsoleteEntryPage
          accession={accession}
          details={inactiveEntryData.inactiveReason}
        />
      </BaseLayout>
    );
  }
  const transformedData = uniProtKbConverter(data);

  const sections = UniProtKBEntryConfig.map((section) => ({
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
      icon: <TremblIcon />,
      itemContent: (
        <InPageNav sections={sections} rootElement=".base-layout__content" />
      ),
      path: '',
      exact: true,
      actionButtons: (
        <div className="button-group">
          <button type="button" className="button tertiary">
            Blast
          </button>
          <button type="button" className="button tertiary">
            Align
          </button>
          <DropdownButton
            label={
              <Fragment>
                <DownloadIcon />
                Download
              </Fragment>
            }
            className="tertiary"
            // onSelect={action('onSelect')}
          >
            <div className="dropdown-menu__content">
              <ul>
                {fileFormatEntryDownload.map((fileFormat) => (
                  <li key={fileFormat}>
                    <a
                      href={apiUrls.entryDownload(
                        transformedData.primaryAccession,
                        fileFormat
                      )}
                    >
                      {fileFormat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </DropdownButton>
          <button type="button" className="button tertiary">
            Add
          </button>
        </div>
      ),
      mainContent: <EntryMain transformedData={transformedData} />,
    },
    {
      name: 'Feature viewer',
      path: 'feature-viewer',
      icon: <ProtVistaIcon />,
      mainContent: <FeatureViewer accession={accession} />,
    },
    {
      name: 'Publications',
      path: 'publications',
      icon: <PublicationIcon />,
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
      icon: <ExternalLinkIcon />,
      mainContent: <EntryExternalLinks transformedData={transformedData} />,
    },
  ];

  return (
    <section id="entry-container">
      <SideBarLayout
        sidebar={
          <DisplayMenu
            data={displayMenuData}
            title={`Publications for ${accession}`}
          />
        }
        actionButtons={
          <Switch>
            {displayMenuData.map((displayItem) => (
              <Route
                path={`${path}/${displayItem.path}`}
                render={() => <Fragment>{displayItem.actionButtons}</Fragment>}
                key={displayItem.name}
              />
            ))}
          </Switch>
        }
      >
        <Switch>
          {displayMenuData.map((displayItem) => (
            <Route
              path={`${path}/${displayItem.path}`}
              render={() => <Fragment>{displayItem.mainContent}</Fragment>}
              key={displayItem.name}
              exact={displayItem.exact}
            />
          ))}
        </Switch>
      </SideBarLayout>
    </section>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    publicationsData: state.entry.publicationsData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchEntryPublications: (accession: string, reset?: boolean) =>
        entryActions.fetchEntryPublicationsIfNeeded(accession, reset),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));
