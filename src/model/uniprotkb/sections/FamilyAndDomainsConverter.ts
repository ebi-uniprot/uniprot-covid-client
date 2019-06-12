import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import { Xref, XrefUIModel, getXrefsForSection } from '../../utils/XrefUtils';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import Comment from '../../types/Comment';

type FamilyAndDomainsAPIModel = {
  comments?: FreeTextData;
  keywords?: Keyword[];
  features?: FeatureData;
  databaseCrossReferences?: Xref[];
};

export type FamilyAndDomainsUIModel = {
  keywordData: KeywordUIModel[];
  commentsData: Map<Comment, FreeTextData>;
  similarityCommentsData: FreeTextData;
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

const familyAndDomainsKeywords = [KeywordCategory.DOMAIN];

const familyAndDomainsFeatures = [
  FeatureType.DOMAIN,
  FeatureType.REGION,
  FeatureType.REPEAT,
  FeatureType.MOTIF,
  FeatureType.COMPBIAS,
];

const familyAndDomainsComments = [Comment.DOMAIN, Comment.SIMILARITY];

export const convertFamilyAndDomains = (data: FamilyAndDomainsAPIModel) => {
  const familyAndDomainsData: FamilyAndDomainsUIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
    similarityCommentsData: [],
  };
  const { comments, keywords, features, databaseCrossReferences } = data;
  if (comments) {
    familyAndDomainsComments.forEach(commentType => {
      familyAndDomainsData.commentsData.set(
        commentType,
        comments.filter(comment => comment.commentType === commentType)
      );
    });
  }
  if (keywords) {
    familyAndDomainsData.keywordData = getKeywordsForCategories(
      keywords,
      familyAndDomainsKeywords
    );
  }
  if (features) {
    familyAndDomainsData.featuresData = features.filter(feature =>
      familyAndDomainsFeatures.includes(feature.type)
    );
  }
  if (databaseCrossReferences) {
    familyAndDomainsData.xrefData = getXrefsForSection(
      databaseCrossReferences,
      EntrySection.FamilyAndDomains
    );
  }
  return familyAndDomainsData;
};
