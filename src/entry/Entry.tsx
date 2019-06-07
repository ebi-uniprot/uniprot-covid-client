import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { InPageNav, DownloadIcon } from 'franklin-sites';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
import uniProtKbConverter, {
  UniProtkbUIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import EntrySection from '../model/types/EntrySection';
import { hasContent } from '../model/utils/utils';
import SideBarLayout from '../layout/SideBarLayout';

interface MatchParams {
  accession: string;
}

interface EntryProps extends RouteComponentProps<MatchParams> {}

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length === 0) {
    return null;
  }

  const transformedData: UniProtkbUIModel = uniProtKbConverter(entryData);

  const sections = UniProtKBEntryConfig.map(section => {
    return {
      label: section.name,
      id: section.name,
      disabled: !hasContent((transformedData as any)[section.name]),
    };
  });

  return (
    <Fragment>
      <SideBarLayout
        sidebar={<InPageNav sections={sections} />}
        content={
          <Fragment>
            <div className="button-group">
              <button className="button link-button">Blast</button>
              <button className="button link-button">Align</button>
              <button className="button link-button">
                <DownloadIcon />
                Download
              </button>
              <button className="button link-button">Add</button>
            </div>
            <ProteinOverview
              data={transformedData[EntrySection.NamesAndTaxonomy]}
              proteinExistence={transformedData.proteinExistence}
              primaryAccession={transformedData.primaryAccession}
              uniProtId={transformedData.uniProtId}
            />
            {UniProtKBEntryConfig.map(({ name, sectionContent }) => {
              return sectionContent(transformedData);
            })}
          </Fragment>
        }
      />

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
