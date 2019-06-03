import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import { DiseaseCommentData } from '../../../view/uniprotkb/components/DiseaseInvolvementView';
import Comment from '../../types/Comment';
import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';

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
      comment => comment.commentType === Comment.DISEASE
    );
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.DISEASE,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      pathologyAndBiotechData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [FeatureType.MUTAGEN].includes(feature.type);
    });
    pathologyAndBiotechData.featuresData = features;
  }
  return pathologyAndBiotechData;
};
