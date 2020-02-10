import React, { useEffect } from 'react';
import {
  withRouter,
  RouteComponentProps,
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { InPageNav, Loader } from 'franklin-sites';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import uniProtKbConverter, {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { hasContent, hasExternalLinks } from '../model/utils/utils';
import SideBarLayout from '../layout/SideBarLayout';
import EntrySection from '../model/types/EntrySection';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';
import { RootState, RootAction } from '../state/state-types';
import * as entryActions from './state/entryActions';

type MatchParams = {
  accession: string;
};

type EntryProps = RouteComponentProps<MatchParams> & {
  entryData: UniProtkbAPIModel | null;
  dispatchFetchEntry: (accesion: string) => void;
  dispatchResetEntry: () => void;
};

const Entry: React.FC<EntryProps> = ({
  match,
  history,
  entryData,
  dispatchFetchEntry,
  dispatchResetEntry,
}) => {
  useEffect(() => {
    dispatchFetchEntry(match.params.accession);
    return function cleanup() {
      dispatchResetEntry();
    };
  }, [match, dispatchFetchEntry, dispatchResetEntry]);

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

  return (
    <SideBarLayout sidebar={<InPageNav sections={sections} />}>
      <Router history={history}>
        <Switch>
          <Route
            path={`${match.url}/`}
            render={() => <EntryMain transformedData={transformedData} />}
            exact
          />
          <Route
            path={`${match.url}/external-links`}
            render={() => (
              <EntryExternalLinks transformedData={transformedData} />
            )}
          />
        </Switch>
      </Router>
    </SideBarLayout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    entryData: state.entry.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchEntry: (accession: string) =>
        entryActions.fetchEntryIfNeeded(accession),
      dispatchResetEntry: () => entryActions.resetEntry(),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));
