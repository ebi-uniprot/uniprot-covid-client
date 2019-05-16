import React, { FC, Fragment } from 'react';
import FeatureTypes from '../../model/types/featureTypes';
import FeaturesView, { FeatureData } from '../../model/FeaturesView';
import DiseaseInvolvement, {
  DiseaseCommentData,
} from '../../model/DiseaseInvolvement';
import CommentType from '../../model/types/commentType';

type data = {
  primaryAccession: string;
  features?: FeatureData;
  comments?: DiseaseCommentData;
  sequence: { value: string };
};

const getPathologyAndBiotechData = (data: data) => {
  let pathologyAndBiotechData: {
    featuresData: FeatureData;
    diseaseInvolvementData: DiseaseCommentData;
  } = {
    featuresData: [],
    diseaseInvolvementData: [],
  };
  if (data.comments) {
    pathologyAndBiotechData.diseaseInvolvementData = data.comments.filter(
      comment => comment.commentType === CommentType.DISEASE
    );
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [FeatureTypes.MUTAGEN].includes(feature.type);
    });
    pathologyAndBiotechData.featuresData = features;
  }
  return pathologyAndBiotechData;
};

const PathologyAndBiotechSection: FC<{ entryData: data }> = ({ entryData }) => {
  const pathologyAndBiotechData = getPathologyAndBiotechData(entryData);
  if (
    pathologyAndBiotechData.featuresData.length <= 0 &&
    pathologyAndBiotechData.diseaseInvolvementData.length <= 0
  ) {
    return null;
  }
  return (
    <Fragment>
      <DiseaseInvolvement
        comments={pathologyAndBiotechData.diseaseInvolvementData}
        primaryAccession={entryData.primaryAccession}
      />
      <FeaturesView
        features={pathologyAndBiotechData.featuresData}
        sequence={entryData.sequence}
      />
    </Fragment>
  );
};

export default PathologyAndBiotechSection;
