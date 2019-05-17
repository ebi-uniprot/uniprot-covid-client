import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from '../../model/FeaturesView';
import DiseaseInvolvement from '../../model/DiseaseInvolvement';
import { Keyword } from '../../model/Keyword';
import EntrySectionType from '../../model/types/EntrySection';
import { isEmpty } from '../../model/utils/utils';
import { UniProtkbDataModel } from '../../model/uniprotkb/UniProtkbConverter';

const PathologyAndBiotechSection: FC<{ data: UniProtkbDataModel }> = ({
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
