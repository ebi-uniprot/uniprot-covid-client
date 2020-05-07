import React, { Fragment, memo } from 'react';
import { Card } from 'franklin-sites';
import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';
import { ProteinOverview } from '../protein-data-views/ProteinOverviewView';
import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';
import UniProtKBTitle from '../protein-data-views/UniProtKBTitle';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'accession' value is the same.
  return (
    prevProps.transformedData.primaryAccession ===
    nextProps.transformedData.primaryAccession
  );
}

const EntryMain: React.FC<EntryMainProps> = ({ transformedData }) => (
  <Fragment>
    <Card
      title={
        <UniProtKBTitle
          primaryAccession={transformedData.primaryAccession}
          entryType={transformedData.entryType}
          uniProtkbId={transformedData.uniProtkbId}
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

export default memo(EntryMain, arePropsEqual);
