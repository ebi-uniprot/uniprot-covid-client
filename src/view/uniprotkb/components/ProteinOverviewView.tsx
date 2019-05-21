import React, { Fragment, FC } from 'react';
import { Organism } from './OrganismView';
import { Card, InfoList } from 'franklin-sites';
import { UniProtkbUIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import EntrySectionType from '../../../model/types/EntrySectionType';
import GeneNamesView from './GeneNamesView';

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
      content: geneNamesData && <GeneNamesView {...geneNamesData} />,
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
