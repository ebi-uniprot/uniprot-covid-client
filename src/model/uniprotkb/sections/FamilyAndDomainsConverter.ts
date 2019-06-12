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
  familyAndDomainsComments.forEach(commentType => {
    if (data.comments) {
      familyAndDomainsData.commentsData.set(
        commentType,
        data.comments.filter(comment => comment.commentType === commentType)
      );
    }
  });
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      familyAndDomainsKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      familyAndDomainsData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return familyAndDomainsFeatures.includes(feature.type);
    });
    familyAndDomainsData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.FamilyAndDomains
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      familyAndDomainsData.xrefData = xrefs;
    }
  }
  return familyAndDomainsData;
};
