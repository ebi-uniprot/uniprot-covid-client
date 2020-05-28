import React, { Fragment, memo } from 'react';
import { Card } from 'franklin-sites';

import { ProteinOverview } from '../protein-data-views/ProteinOverviewView';
import UniProtKBTitle from '../protein-data-views/UniProtKBTitle';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

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
    <ErrorBoundary>
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
    </ErrorBoundary>

    {UniProtKBEntryConfig.map(({ name, sectionContent }) => (
      <ErrorBoundary key={name}>
        {sectionContent(transformedData)}
      </ErrorBoundary>
    ))}
  </Fragment>
);

export default memo(EntryMain, arePropsEqual);
