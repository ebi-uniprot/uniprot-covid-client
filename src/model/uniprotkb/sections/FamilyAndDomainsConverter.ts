import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import Comment from '../../types/Comment';
import { convertSection, APIModel } from '../SectionConverter';

const familyAndDomainsKeywords = [KeywordCategory.DOMAIN];

const familyAndDomainsFeatures = [
  FeatureType.DOMAIN,
  FeatureType.REGION,
  FeatureType.REPEAT,
  FeatureType.MOTIF,
  FeatureType.COMPBIAS,
];

const familyAndDomainsComments = [Comment.DOMAIN, Comment.SIMILARITY];

export const convertFamilyAndDomains = (data: APIModel) => {
  return convertSection(
    data,
    familyAndDomainsComments,
    familyAndDomainsKeywords,
    familyAndDomainsFeatures,
    EntrySection.FamilyAndDomains
  );
};
