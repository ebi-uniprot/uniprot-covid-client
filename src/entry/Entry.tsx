import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import apiUrls from '../utils/apiUrls';
import FieldToViewMappings from '../views/FieldToViewMappings';

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
      {FieldToViewMappings.protein_name(entryData)}
      {FieldToViewMappings.organism(entryData)}
    </Fragment>
  );
};

export default withRouter(Entry);
