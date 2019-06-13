import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import DiseaseInvolvementView from '../uniprotkb/components/DiseaseInvolvementView';
import KeywordView from '../uniprotkb/components/KeywordView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import Comment from '../../model/types/Comment';

const PathologyAndBiotechSection: FC<{
  data: UIModel;
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
          comments={data.commentsData.get(Comment.DISEASE)}
          primaryAccession={primaryAccession}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
      </Card>
    </Fragment>
  );
};

export default PathologyAndBiotechSection;
