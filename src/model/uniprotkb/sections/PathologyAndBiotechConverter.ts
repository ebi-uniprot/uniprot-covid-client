import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import { DiseaseCommentData } from '../../../view/uniprotkb/components/DiseaseInvolvementView';
import CommentType from '../../types/CommentType';
import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategories from '../../types/KeywordTypes';
import FeatureTypes from '../../types/FeatureTypes';

type PathologyAndBiotechAPIModel = {
  primaryAccession: string;
  features?: FeatureData;
  comments?: DiseaseCommentData;
  keywords?: Keyword[];
  sequence: { value: string };
};

export type PathologyAndBiotechUIModel = {
  featuresData: FeatureData;
  keywordData: KeywordUIModel[];
  diseaseInvolvementData: DiseaseCommentData;
};

export const convertPathologyAndBiotech = (
  data: PathologyAndBiotechAPIModel
) => {
  const pathologyAndBiotechData: PathologyAndBiotechUIModel = {
    featuresData: [],
    keywordData: [],
    diseaseInvolvementData: [],
  };
  if (data.comments) {
    pathologyAndBiotechData.diseaseInvolvementData = data.comments.filter(
      comment => comment.commentType === CommentType.DISEASE
    );
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategories.DISEASE,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      pathologyAndBiotechData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [FeatureTypes.MUTAGEN].includes(feature.type);
    });
    pathologyAndBiotechData.featuresData = features;
  }
  return pathologyAndBiotechData;
};
