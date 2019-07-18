import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import Comment from '../../types/Comment';
import { convertSection, APIModel } from '../SectionConverter';

const keywordsCategories = [KeywordCategory.DOMAIN];

const featuresCategories = [
  FeatureType.DOMAIN,
  FeatureType.REGION,
  FeatureType.REPEAT,
  FeatureType.MOTIF,
  FeatureType.COMPBIAS,
];

const familyAndDomainsComments = [Comment.DOMAIN, Comment.SIMILARITY];

const convertFamilyAndDomains = (data: APIModel) => {
  return convertSection(
    data,
    familyAndDomainsComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.FamilyAndDomains
  );
};

export default convertFamilyAndDomains;
