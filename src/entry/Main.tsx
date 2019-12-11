import React, { Fragment, memo } from 'react';
import { Card, DownloadIcon } from 'franklin-sites';
import { RouteComponentProps, withRouter } from 'react-router';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
import { UniProtkbUIModel } from '../model/uniprotkb/UniProtkbConverter';
import UniProtTitle from '../view/uniprotkb/components/UniProtTitle';

type MainProps = {
  transformedData: UniProtkbUIModel;
} & RouteComponentProps;

function arePropsEqual(prevProps: MainProps, nextProps: MainProps) {
  // Do NOT re-render the page, as long as the 'accession' value is the same.
  return (
    prevProps.transformedData.primaryAccession ===
    nextProps.transformedData.primaryAccession
  );
}

const Main: React.FC<MainProps> = ({ transformedData }) => (
  <Fragment>
    <div className="button-group">
      <button type="button" className="button link-button">
        Blast
      </button>
      <button type="button" className="button link-button">
        Align
      </button>
      <button type="button" className="button link-button">
        <DownloadIcon />
        Download
      </button>
      <button type="button" className="button link-button">
        Add
      </button>
    </div>
    <Card
      title={
        <UniProtTitle
          primaryAccession={transformedData.primaryAccession}
          entryType={transformedData.entryType}
          uniProtId={transformedData.uniProtId}
        />
      }
    >
      <ProteinOverview transformedData={transformedData} />
    </Card>
    {UniProtKBEntryConfig.map(({ sectionContent }) =>
      sectionContent(transformedData)
    )}
  </Fragment>
);

export default withRouter(memo(Main, arePropsEqual));
