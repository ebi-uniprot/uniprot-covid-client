import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { convertSection } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [KeywordCategory.DISEASE];

const featuresCategories = [FeatureType.MUTAGEN];

const commentsCategories = [Comment.DISEASE];

const convertPathologyAndBiotech = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.PathologyAndBioTech
  );
};

export default convertPathologyAndBiotech;
