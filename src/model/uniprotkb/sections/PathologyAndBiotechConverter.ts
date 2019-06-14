import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { APIModel, convertSection } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';

const keywordsCategories = [KeywordCategory.DISEASE];

const featuresCategories = [FeatureType.MUTAGEN];

const commentsCategories = [Comment.DISEASE];

export const convertPathologyAndBiotech = (data: APIModel) => {
  return convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.PathologyAndBioTech
  );
};
