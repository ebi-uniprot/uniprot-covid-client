import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import DiseaseInvolvement from '../uniprotkb/components/DiseaseInvolvementView';
import { Keyword } from '../uniprotkb/components/KeywordView';
import EntrySectionType from '../../model/types/EntrySectionType';
import { isEmpty } from '../../model/utils/utils';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const PathologyAndBiotechSection: FC<{ data: UniProtkbUIModel }> = ({
  data,
}) => {
  const pathologyAndBiotechData = data[EntrySectionType.PathologyAndBioTech];
  if (isEmpty(pathologyAndBiotechData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.PathologyAndBioTech}>
        <DiseaseInvolvement
          comments={pathologyAndBiotechData.diseaseInvolvementData}
          primaryAccession={data.primaryAccession}
        />
        <FeaturesView
          features={pathologyAndBiotechData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <Keyword keywords={pathologyAndBiotechData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default PathologyAndBiotechSection;
