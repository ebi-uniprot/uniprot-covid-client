import React, { Fragment, FC } from 'react';
import { Card, InfoList, SwissProtIcon, TremblIcon } from 'franklin-sites';
import OrganismView from './OrganismView';
import GeneNamesView from './GeneNamesView';
import { NamesAndTaxonomyUIModel } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import { EntryType } from '../../../model/uniprotkb/UniProtkbConverter';
import './styles/ProteinOverviewView.scss';

export const ProteinOverview: FC<{
  data: NamesAndTaxonomyUIModel;
  proteinExistence: string;
  primaryAccession: string;
  uniProtId: string;
  entryType: EntryType;
}> = ({ data, proteinExistence, primaryAccession, uniProtId, entryType }) => {
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
      className="protein-overview"
      title={(
        <Fragment>
          {entryType === EntryType.SWISSPROT ? (
            <span className="protein-overview__status icon--reviewed">
              <SwissProtIcon />
            </span>
          ) : (
            <span className="protein-overview__status icon--unreviewed">
              <TremblIcon />
            </span>
          )}
          {primaryAccession}
          {' '}
          <small>
            {`${proteinNamesData && uniProtId} - `}
            {proteinNamesData &&
              proteinNamesData.recommendedName &&
              proteinNamesData.recommendedName.fullName.value}
          </small>
        </Fragment>
)}
    >
      <InfoList infoData={infoListData} />
    </Card>
  );
};

export default ProteinOverview;
