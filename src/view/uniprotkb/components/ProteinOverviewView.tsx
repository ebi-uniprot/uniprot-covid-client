import React, { Fragment, FC } from 'react';
import OrganismView from './OrganismView';
import { Card, InfoList } from 'franklin-sites';
import GeneNamesView from './GeneNamesView';
import { NamesAndTaxonomyUIModel } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

export const ProteinOverview: FC<{
  data: NamesAndTaxonomyUIModel;
  proteinExistence: string;
  primaryAccession: string;
  uniProtId: string;
}> = ({ data, proteinExistence, primaryAccession, uniProtId }) => {
  const { proteinNamesData, geneNamesData, organismData } = data;
  const infoListData = [
    {
      title: 'Organism',
      content: organismData && <OrganismView data={organismData} />,
    },
    {
      title: 'Gene',
      content: geneNamesData && <GeneNamesView {...geneNamesData} />,
    },
    {
      title: 'Evidence',
      content: proteinExistence,
    },
  ];

  return (
    <Card
      title={
        <Fragment>
          {proteinNamesData && uniProtId}{' '}
          <small>
            {primaryAccession} -{' '}
            {proteinNamesData &&
              proteinNamesData.recommendedName &&
              proteinNamesData.recommendedName.fullName.value}
          </small>
        </Fragment>
      }
    >
      <InfoList infoData={infoListData} />
    </Card>
  );
};

export default ProteinOverview;
