import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import DiseaseInvolvementView from '../uniprotkb/components/DiseaseInvolvementView';
import KeywordView from '../uniprotkb/components/KeywordView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { PathologyAndBiotechUIModel } from '../../model/uniprotkb/sections/PathologyAndBiotechConverter';

const PathologyAndBiotechSection: FC<{
  data: PathologyAndBiotechUIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, primaryAccession, sequence }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.PathologyAndBioTech}>
        <DiseaseInvolvementView
          comments={data.diseaseInvolvementData}
          primaryAccession={primaryAccession}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
      </Card>
    </Fragment>
  );
};

export default PathologyAndBiotechSection;
