import React, { Fragment } from 'react';
import { InfoList, ExternalLink } from 'franklin-sites';
import { OrganismData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import externalUrls from '../../../utils/externalUrls';

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
    <Fragment>
      <a href={`//www.uniprot.org/taxonomy/${taxonId}`}>{`${taxonId} `}</a>
      <ExternalLink url={externalUrls.NCBI(taxonId)}>NCBI</ExternalLink>
    </Fragment>
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
    <a href={`https://www.uniprot.org/taxonomy/${data.taxonId}`}>{termValue}</a>
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
          <a href={`//www.uniprot.org/taxonomy/${data.taxonId}`}>
            {`${data.scientificName} (${data.commonName})`}
          </a>
          {data.evidences && data.evidences.length && (
            <UniProtEvidenceTag evidences={data.evidences} />
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
          {hosts.map(host => (
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
