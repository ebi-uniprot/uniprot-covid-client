import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import apiUrls from '../utils/apiUrls';
import { EntryProteinNames } from '../model/ProteinNames';
import { ProteinOverview } from '../model/ProteinOverview';
import { Card } from 'franklin-sites';
import { FreeText, FreeTextType } from '../model/FreeText';

interface MatchParams {
  accession: string;
}

interface EntryProps extends RouteComponentProps<MatchParams> {}

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const data = useDataApi(url);
  if (
    Object.keys(data).length <= 0 ||
    !data.results ||
    data.results.length <= 0
  ) {
    return null;
  }
  const entryData = data.results[0];

  return (
    <Fragment>
      <ProteinOverview data={entryData} />
      <Card title="Function">
        <FreeText data={entryData} type={FreeTextType.FUNCTION} />
      </Card>
      <Card title="Names & Taxonomy">
        <EntryProteinNames data={entryData} />
      </Card>
      <Card title="Subcellular Location" />
      <Card title="Pathology & Biotech" />
      <Card title="PTM/Processing" />
      <Card title="Expression" />
      <Card title="Interaction" />
      <Card title="Structure" />
      <Card title="Family & Domains" />
      <Card title="Sequences" />
      <Card title="Similar Proteins" />
      <Card title="Cross-References" />
      <Card title="Entry Information" />
      <Card title="Miscellaneous" />
    </Fragment>
  );
};

export default withRouter(Entry);
