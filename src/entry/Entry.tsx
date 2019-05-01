import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import apiUrls from '../utils/apiUrls';
import { EntryProteinNames } from '../model/ProteinNames';
import { ProteinOverview } from '../model/ProteinOverview';
import { FreeText, FreeTextType } from '../model/FreeText';
import XRef from '../model/XRef';
import { CatalyticActivity } from '../model/CatalyticActivity';
import { Card } from 'franklin-sites';
import { SequenceViewEntry } from '../model/SequenceView';
import EntrySectionType from '../model/types/EntrySection';
import { Keyword } from '../model/Keyword';
import FeaturesView from '../model/FeaturesView';
import FeatureTypes from '../model/types/featureTypes';

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
        <Keyword data={entryData} section={EntrySectionType.Function} />
        <FeaturesView
          data={entryData}
          types={[
            FeatureTypes.ACTIVE_SITE,
            FeatureTypes.OTHER_BINDING_SITE,
            FeatureTypes.NUCLEOTIDE_BINDING,
          ]}
        />
        <XRef data={entryData} section={EntrySectionType.Function} />
      </Card>
      <Card title="Names & Taxonomy">
        <EntryProteinNames data={entryData} />
        <XRef data={entryData} section={EntrySectionType.NamesAndTaxonomy} />
      </Card>
      {/* <Card title="Subcellular Location" />
      <Card title="Pathology & Biotech" /> */}
      <Card title="PTM/Processing">
        <FeaturesView
          data={entryData}
          types={[FeatureTypes.CHAIN, FeatureTypes.PTM, FeatureTypes.CROSSLINK]}
        />
      </Card>
      <Card title="Expression">
        <h4>Tissue specificity</h4>
        <FreeText data={entryData} type={FreeTextType.TISSUE_SPECIFICITY} />
        <h4>Induction</h4>
        <FreeText data={entryData} type={FreeTextType.INDUCTION} />
        <Keyword data={entryData} section={EntrySectionType.Expression} />
        <XRef data={entryData} section={EntrySectionType.Expression} />
      </Card>
      {/* <Card title="Interaction" />
      <Card title="Structure" />
      <Card title="Family & Domains" /> */}
      <Card title="Sequences">
        <SequenceViewEntry data={entryData} />
        <Keyword data={entryData} section={EntrySectionType.Sequence} />
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
