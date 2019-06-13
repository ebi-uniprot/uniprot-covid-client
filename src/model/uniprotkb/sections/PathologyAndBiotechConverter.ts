import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { APIModel, convertSection } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';

const pathologyAndBiotechKeywords = [KeywordCategory.DISEASE];

const pathologyAndBiotechFeatures = [FeatureType.MUTAGEN];

const pathologyAndBiotechComments = [Comment.DISEASE];

export const convertPathologyAndBiotech = (data: APIModel) => {
  return convertSection(
    data,
    pathologyAndBiotechComments,
    pathologyAndBiotechKeywords,
    pathologyAndBiotechFeatures,
    EntrySection.PathologyAndBioTech
  );
};
