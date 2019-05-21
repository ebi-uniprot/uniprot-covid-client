import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
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
      <ProteinOverview data={transformedData} />

      {UniProtKBEntryConfig.map(({ name, sectionContent }) => {
        return sectionContent(transformedData);
      })}

      {/* <Card title="Structure">
        <FeaturesView
          data={entryData}
          types={[FeatureTypes.HELIX, FeatureTypes.TURN, FeatureTypes.STRAND]}
        />
      </Card> */}
    </Fragment>
  );
};

export default withRouter(Entry);
