import React, { useState, Fragment } from 'react';
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
import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';
import uniProtKbConverter, {
  EntryType,
  UniProtkbInactiveEntryModel,
} from '../../adapters/UniProtkbConverter';
import { hasContent, hasExternalLinks } from '../../utils/utils';
import EntrySection from '../../types/EntrySection';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';
import apiUrls from '../../config/apiUrls';
import {
  SelectedFacet,
  fileFormatEntryDownload,
} from '../../types/resultsTypes';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryPublications from './EntryPublications';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import BaseLayout from '../../../shared/components/layouts/BaseLayout';
import ObsoleteEntryPage from '../../../shared/components/error-pages/ObsoleteEntryPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import FeatureViewer from './FeatureViewer';
import useDataApi from '../../../shared/hooks/useDataApi';

type MatchParams = {
  accession: string;
  path: string;
};

const Entry: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { path, params } = match;
  const { accession } = params;
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacet[]>([]);

  const { loading, data, status, error } = useDataApi(apiUrls.entry(accession));

  if (error) {
    return <ErrorHandler status={status} />;
  }

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

  const sections = UniProtKBEntryConfig.map(section => ({
    label: section.name,
    id: section.name,

    disabled:
      section.name === EntrySection.ExternalLinks
        ? !hasExternalLinks(transformedData)
        : !hasContent(transformedData[section.name]),
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
                {fileFormatEntryDownload.map(fileFormat => (
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
          accession={accession}
          selectedFacets={selectedFacets}
          setSelectedFacets={setSelectedFacets}
        />
      ),
      mainContent: (
        <EntryPublications
          accession={accession}
          selectedFacets={selectedFacets}
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
            {displayMenuData.map(displayItem => (
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
          {displayMenuData.map(displayItem => (
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

export default withRouter(Entry);
