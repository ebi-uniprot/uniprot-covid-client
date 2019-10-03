import React, { FC } from 'react';
import { InfoList, DoughnutChart } from 'franklin-sites';
import idx from 'idx';
import OrganismView from './OrganismView';
import GeneNamesView from './GeneNamesView';
import { UniProtkbUIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import EntrySection from '../../../model/types/EntrySection';

export const annotationScoreToPercentage = (annotationScore: number) => {
  /*
    0-19: bin 1
    20-39: bin 2
    40-59: bin 3
    60-79: bin 4
    80 and above bin 5.
  */
  const bin = Math.floor(annotationScore / 20) + 1;
  return Math.min(bin, 5) * 20;
};

export const ProteinOverview: FC<{
  transformedData: UniProtkbUIModel;
}> = ({ transformedData }) => {
  const { proteinExistence, annotationScore } = transformedData;
  const { proteinNamesData, geneNamesData, organismData } = transformedData[
    EntrySection.NamesAndTaxonomy
  ];
  const proteinName = idx(
    proteinNamesData,
    _ => _.recommendedName.fullName.value
  );
  const ECnumbers = idx(proteinNamesData, _ => _.recommendedName.ecNumbers);
  const infoListData = [
    {
      title: 'Name',
      content: proteinName,
    },
    {
      title: 'EC number',
      content:
        ECnumbers && ECnumbers.map(ec => <div key={ec.value}>{ec.value}</div>),
    },
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
    {
      title: 'Annotation score',
      content: (
        <DoughnutChart percent={annotationScoreToPercentage(annotationScore)}>
          {annotationScore > 99 ? '99+' : annotationScore}
        </DoughnutChart>
      ),
    },
  ];

  return <InfoList infoData={infoListData} />;
};

export default ProteinOverview;
