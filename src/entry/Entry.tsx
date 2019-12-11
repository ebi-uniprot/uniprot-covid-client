import React from 'react';
import {
  withRouter,
  RouteComponentProps,
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { InPageNav, Loader } from 'franklin-sites';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import uniProtKbConverter, {
  UniProtkbUIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { hasContent, hasExternalLinks } from '../model/utils/utils';
import SideBarLayout from '../layout/SideBarLayout';
import EntrySection from '../model/types/EntrySection';
import Main from './Main';
import ExternalLinks from './ExternalLinks';

type MatchParams = {
  accession: string;
};

type EntryProps = RouteComponentProps<MatchParams>;

const Entry: React.FC<EntryProps> = ({ match, history }) => {
  const url = apiUrls.entry(match.params.accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length === 0) {
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
            render={() => <Main transformedData={transformedData} />}
            exact
          />
          <Route
            path={`${match.url}/external-links`}
            render={() => <ExternalLinks transformedData={transformedData} />}
          />
        </Switch>
      </Router>
    </SideBarLayout>
  );
};

export default withRouter(Entry);
