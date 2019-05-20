import React, { Fragment, FC } from 'react';
import { Organism } from './Organism';
import { Card, InfoList } from 'franklin-sites';
import { UniProtkbUIModel } from './uniprotkb/UniProtkbConverter';
import EntrySectionType from './types/EntrySectionType';
import { GeneNames } from './GeneNames';

export const ProteinOverview: FC<{ data: UniProtkbUIModel }> = ({ data }) => {
  const { proteinNamesData, geneNamesData, organismData } = data[
    EntrySectionType.NamesAndTaxonomy
  ];
  const infoListData = [
    {
      title: 'Organism',
      content: organismData && <Organism data={organismData} />,
    },
    {
      title: 'Gene',
      content: geneNamesData && <GeneNames {...geneNamesData} />,
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
          {proteinNamesData && data.uniProtId}{' '}
          <small>
            {data.primaryAccession} -{' '}
            {proteinNamesData && proteinNamesData.recommendedName}
          </small>
        </Fragment>
      }
    >
      <InfoList infoData={infoListData} />
    </Card>
  );
};

export default ProteinOverview;
