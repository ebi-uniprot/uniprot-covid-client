import React, { Fragment } from 'react';
import { InfoList, ExternalLink } from 'franklin-sites';
import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import externalUrls from '../../config/externalUrls';

type OrganismDataProps = {
  data: OrganismData;
};

export const OrganismLineage: React.FC<{ lineage: string[] }> = ({
  lineage,
}) => <Fragment>{lineage.join(' > ')}</Fragment>;

export const OrganismId: React.FC<{ taxonId: number | undefined }> = ({
  taxonId,
}) => {
  if (!taxonId) {
    return null;
  }
  return (
    <ExternalLink url={externalUrls.NCBI(taxonId)}>{taxonId}</ExternalLink>
  );
};

const OrganismView: React.FC<OrganismDataProps> = ({
  data,
}): JSX.Element | null => {
  if (!data) {
    return null;
  }

  const termValue = `${data.scientificName}${
    data.commonName ? ` (${data.commonName})` : ''
  } ${data.synonyms && data.synonyms.length > 0 ? ` (${data.synonyms})` : ''}`;

  return (
    <ExternalLink url={externalUrls.NCBI(data.taxonId)}>
      {termValue}
    </ExternalLink>
  );
};

export const OrganismListView: React.FC<{
  data?: OrganismData;
  hosts?: OrganismData[];
}> = ({ data, hosts }): JSX.Element | null => {
  if (!data) {
    return null;
  }
  const infoListData: { title: string; content: JSX.Element | string }[] = [];
  if (data.scientificName) {
    infoListData.push({
      title: 'Organism',
      content: (
        <Fragment>
          {data.taxonId && (
            <ExternalLink url={externalUrls.NCBI(data.taxonId)}>
              {`${data.scientificName} (${data.commonName})`}
            </ExternalLink>
          )}
          {data.evidences && data.evidences.length && (
            <UniProtKBEvidenceTag evidences={data.evidences} />
          )}
        </Fragment>
      ),
    });
  }
  if (data.taxonId) {
    infoListData.push({
      title: 'Taxonomic identifier',
      content: <OrganismId taxonId={data.taxonId} />,
    });
  }
  if (data.lineage) {
    infoListData.push({
      title: 'Taxonomic lineage',
      content: <OrganismLineage lineage={data.lineage} />,
    });
  }
  if (hosts) {
    infoListData.push({
      title: 'Virus hosts',
      content: (
        <Fragment>
          {hosts.map((host) => (
            <p key={host.taxonId}>
              <OrganismView data={host} />
            </p>
          ))}
        </Fragment>
      ),
    });
  }
  return <InfoList infoData={infoListData} />;
};

export default OrganismView;
