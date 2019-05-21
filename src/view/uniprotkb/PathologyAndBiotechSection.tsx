import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import DiseaseInvolvementView from '../uniprotkb/components/DiseaseInvolvementView';
import KeywordView from '../uniprotkb/components/KeywordView';
import EntrySectionType from '../../model/types/EntrySectionType';
import { hasContent } from '../../model/utils/utils';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';

const PathologyAndBiotechSection: FC<{ data: UniProtkbUIModel }> = ({
  data,
}) => {
  const pathologyAndBiotechData = data[EntrySectionType.PathologyAndBioTech];
  if (!hasContent(pathologyAndBiotechData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.PathologyAndBioTech}>
        <DiseaseInvolvementView
          comments={pathologyAndBiotechData.diseaseInvolvementData}
          primaryAccession={data.primaryAccession}
        />
        <FeaturesView
          features={pathologyAndBiotechData.featuresData}
          sequence={data[EntrySectionType.Sequence].sequence}
        />
        <KeywordView keywords={pathologyAndBiotechData.keywordData} />
      </Card>
    </Fragment>
  );
};

export default PathologyAndBiotechSection;
