import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import apiUrls from '../utils/apiUrls';
import { EntryProteinNames } from '../model/ProteinNames';

interface MatchParams {
  accession: string;
}

interface EntryProps extends RouteComponentProps<MatchParams> {}

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const data = useDataApi(url);
  if (Object.keys(data).length <= 0) {
    return null;
  }
  const entryData = data.results[0];

  return (
    <Fragment>
      <h3>Names &amp; Taxonomy</h3>
      <EntryProteinNames data={entryData} />
    </Fragment>
  );
};

export default withRouter(Entry);
