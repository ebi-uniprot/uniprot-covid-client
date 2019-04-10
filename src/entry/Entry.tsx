import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import apiUrls from '../utils/apiUrls';
import { EntryProteinNames } from '../model/ProteinNames';
import { ProteinOverview } from '../model/ProteinOverview';
import { FreeText, FreeTextType } from '../model/FreeText';
import { XRef } from '../model/XRef';
import { CatalyticActivity } from '../model/CatalyticActivity';
import { Card } from 'franklin-sites';
import { SequenceViewEntry } from '../model/SequenceView';
import EntrySectionType from '../data/EntrySection';

interface MatchParams {
  accession: string;
}

interface EntryProps extends RouteComponentProps<MatchParams> {}

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length <= 0) {
    return null;
  }
  return (
    <Fragment>
      <ProteinOverview data={entryData} />
      <Card title="Function">
        <FreeText data={entryData} type={FreeTextType.FUNCTION} />
        <CatalyticActivity data={entryData} />
        <FreeText
          data={entryData}
          type={FreeTextType.PATHWAY}
          includeTitle={true}
        />
        <XRef data={entryData} section={EntrySectionType.Function} />
      </Card>
      <Card title="Names & Taxonomy">
        <EntryProteinNames data={entryData} />
        <XRef data={entryData} section={EntrySectionType.NamesAndTaxonomy} />
      </Card>
      {/* <Card title="Subcellular Location" />
      <Card title="Pathology & Biotech" />
      <Card title="PTM/Processing" />
      <Card title="Expression" />
      <Card title="Interaction" />
      <Card title="Structure" />
      <Card title="Family & Domains" /> */}
      <Card title="Sequences">
        <SequenceViewEntry data={entryData} />
        <XRef data={entryData} section={EntrySectionType.Sequence} />
      </Card>
      {/* <Card title="Similar Proteins" />
      <Card title="Cross-References" />
      <Card title="Entry Information" />
      <Card title="Miscellaneous" /> */}
    </Fragment>
  );
};

export default withRouter(Entry);
