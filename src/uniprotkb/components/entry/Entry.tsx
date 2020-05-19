import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
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
import { RootAction } from '../../../app/state/rootInitialState';
import uniProtKbConverter, {
  EntryType,
  UniProtkbInactiveEntryModel,
} from '../../adapters/uniProtkbConverter';
import { hasContent, hasExternalLinks } from '../../utils/utils';
import EntrySection from '../../types/entrySection';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';
import apiUrls from '../../config/apiUrls';
import { fileFormatEntryDownload } from '../../types/resultsTypes';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryPublications from './EntryPublications';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import BaseLayout from '../../../shared/components/layouts/BaseLayout';
import ObsoleteEntryPage from '../../../shared/components/error-pages/ObsoleteEntryPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import FeatureViewer from './FeatureViewer';
import useDataApi from '../../../shared/hooks/useDataApi';

import * as messagesActions from '../../../messages/state/messagesActions';
import {
  MessageLevel,
  MessageFormat,
  MessageType,
  MessageTag,
} from '../../../messages/types/messagesTypes';
import submitBlast from '../../../blast_website/BlastUtils';

type MatchParams = {
  accession: string;
  path: string;
};

type EntryProps = {
  addMessage: (message: MessageType) => void;
} & RouteComponentProps<MatchParams>;

const Entry: React.FC<EntryProps> = ({ addMessage, match }) => {
  const { path, params } = match;
  const { accession } = params;

  const { loading, data, status, error, redirectedTo } = useDataApi(
    apiUrls.entry(accession)
  );

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

  if (redirectedTo) {
    const message: MessageType = {
      id: 'job-id',
      content: `You are seeing the results from: ${redirectedTo}.`,
      format: MessageFormat.IN_PAGE,
      level: MessageLevel.SUCCESS,
      dateActive: Date.now(),
      dateExpired: Date.now(),
      tag: MessageTag.REDIRECT,
    };

    addMessage(message);
  }

  const transformedData = uniProtKbConverter(data);

  const sections = UniProtKBEntryConfig.map((section) => ({
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
          <button
            type="button"
            className="button tertiary"
            onClick={() =>
              submitBlast(transformedData[EntrySection.Sequence].sequence.value)
            }
          >
            BLAST
          </button>
          {/* <button type="button" className="button tertiary">
            Align
          </button> */}
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
          <a
            className="button tertiary"
            href={`//community.uniprot.org/bbsub/bbsub.html?accession=${accession}`}
          >
            Add a Publication
          </a>
          {/* <button type="button" className="button tertiary">
            Add
          </button> */}
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
      itemContent: <EntryPublicationsFacets accession={accession} />,
      mainContent: <EntryPublications accession={accession} />,
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      addMessage: (message: MessageType) => messagesActions.addMessage(message),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));
