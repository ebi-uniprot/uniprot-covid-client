import React, { Fragment, FC } from 'react';
import {
  Card,
  InfoList,
  SwissProtIcon,
  TremblIcon,
  Bubble,
} from 'franklin-sites';
import OrganismView from './OrganismView';
import GeneNamesView from './GeneNamesView';
import {
  EntryType,
  UniProtkbUIModel,
} from '../../../model/uniprotkb/UniProtkbConverter';
import './styles/ProteinOverviewView.scss';
import EntrySection from '../../../model/types/EntrySection';
import UniProtTitle from './UniProtTitle';

export const ProteinOverview: FC<{
  transformedData: UniProtkbUIModel;
}> = ({ transformedData }) => {
  const {
    proteinExistence,
    primaryAccession,
    uniProtId,
    entryType,
    annotationScore,
  } = transformedData;
  const { proteinNamesData, geneNamesData, organismData } = transformedData[
    EntrySection.NamesAndTaxonomy
  ];
  const infoListData = [
    {
      title: 'Name',
      content:
        proteinNamesData &&
        proteinNamesData.recommendedName &&
        proteinNamesData.recommendedName.fullName.value,
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
      content: <Bubble value={annotationScore} />,
    },
  ];

  return (
    <Card
      className="protein-overview"
      title={
        <Fragment>
          <UniProtTitle
            primaryAccession={primaryAccession}
            entryType={entryType}
            uniProtId={uniProtId}
          />
        </Fragment>
      }
    >
      <InfoList infoData={infoListData} />
    </Card>
  );
};

export default ProteinOverview;
