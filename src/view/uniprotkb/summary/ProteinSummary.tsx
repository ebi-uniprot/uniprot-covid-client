import React, { FC, Fragment } from 'react';
import { Loader, Card, Bubble } from 'franklin-sites';
import useDataApi from '../../../utils/useDataApi';
import apiUrls from '../../../utils/apiUrls';
import UniProtTitle from '../components/UniProtTitle';
import ProteinHighlights from './ProteinHighlights';

const ProteinSummary: FC<{ accession: string | null }> = ({ accession }) => {
  if (!accession) {
    return null;
  }
  const url = apiUrls.entry(accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length === 0) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Card
        title={
          <UniProtTitle
            primaryAccession={entryData.primaryAccession}
            entryType={entryData.entryType}
            uniProtId={entryData.uniProtId}
          />
        }
      >
        <ProteinHighlights data={entryData} />
      </Card>
    </Fragment>
  );
};

export default ProteinSummary;
