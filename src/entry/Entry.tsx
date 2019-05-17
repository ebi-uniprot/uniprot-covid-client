import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from './uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import { ProteinOverview } from '../model/ProteinOverview';
import uniProtKbConverter from '../model/uniprotkb/UniProtkbConverter';

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

  const transformedData = uniProtKbConverter(entryData);

  return (
    <Fragment>
      {/* <ProteinOverview data={transformedData} /> */}

      {UniProtKBEntryConfig.map(({ name, sectionContent }) => {
        return sectionContent(transformedData);
      })}

      {/* <Card title="Structure">
        <FeaturesView
          data={entryData}
          types={[FeatureTypes.HELIX, FeatureTypes.TURN, FeatureTypes.STRAND]}
        />
      </Card> */}
      {/* <Card title="Sequences">
        <SequenceViewEntry data={entryData} />
        <FeaturesView
          data={entryData}
          types={[
            FeatureTypes.COMPBIAS,
            FeatureTypes.NON_STD,
            FeatureTypes.UNSURE,
            FeatureTypes.CONFLICT,
            FeatureTypes.NON_CONS,
            FeatureTypes.NON_TER,
          ]}
        />
        <Keyword data={entryData} section={EntrySectionType.Sequence} />
        <XRef data={entryData} section={EntrySectionType.Sequence} />
      </Card> */}
      {/* <Card title="Similar Proteins" />
      <Card title="Cross-References" />
      <Card title="Entry Information" />
      <Card title="Miscellaneous" /> */}
    </Fragment>
  );
};

export default withRouter(Entry);
