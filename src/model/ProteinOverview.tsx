import React, { Fragment } from 'react';
import { processProteinData, ProteinNamesData } from './ProteinNames';
import { Organism, OrganismData } from './Organism';
import { processGeneData, GeneNamesData } from './GeneNames';
import { Card, InfoList } from 'franklin-sites';

type ProteinOverviewDataProps = {
  data: {
    primaryAccession: string;
    uniProtId: string;
    proteinExistence: string;
    proteinDescription: ProteinNamesData['proteinDescription'];
    organism?: OrganismData['organism'];
    genes?: GeneNamesData['genes'];
  };
};

export const ProteinOverview: React.FC<ProteinOverviewDataProps> = ({
  data,
}) => {
  const { recommendedName } = processProteinData(data);
  const { name: geneName } = processGeneData(data);
  const infoListData = [
    {
      title: 'Organism',
      content: <Organism data={data} />,
    },
    {
      title: 'Gene',
      content: geneName,
    },
    {
      title: 'Evidence',
      content: data.proteinExistence,
    },
  ];

  return (
    <Card
      title={
        <Fragment>
          {data.uniProtId}{' '}
          <small>
            {data.primaryAccession} - {recommendedName}
          </small>
        </Fragment>
      }
    >
      <InfoList infoData={infoListData} />
    </Card>
  );
};

export default ProteinOverview;
