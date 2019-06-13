import { getXrefsForSection, Xref, XrefUIModel } from '../utils/XrefUtils';
import { FreeTextData } from '../../view/uniprotkb/components/FreeTextView';
import { CatalyticActivityData } from '../../view/uniprotkb/components/CatalyticActivityView';
import {
  Keyword,
  getKeywordsForCategories,
  KeywordUIModel,
} from '../utils/KeywordsUtil';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import EntrySection from '../types/EntrySection';
import Comment from '../types/Comment';
import KeywordCategory from '../types/KeywordCategory';
import FeatureType from '../types/FeatureType';
import { DiseaseCommentData } from '../../view/uniprotkb/components/DiseaseInvolvementView';

export type APIModel = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData & DiseaseCommentData;
  keywords?: Keyword[];
  features?: FeatureData;
  databaseCrossReferences?: Xref[];
  sequence: { value: string };
};

export type UIModel = {
  commentsData: Map<Comment, FreeTextData>;
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

export const convertSection = (
  data: APIModel,
  sectionComments?: Comment[],
  sectionKeywords?: KeywordCategory[],
  sectionFeatures?: FeatureType[],
  section?: EntrySection
) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };

  const { comments, keywords, features, databaseCrossReferences } = data;
  if (sectionComments && comments) {
    sectionComments.forEach(commentType => {
      convertedData.commentsData.set(
        commentType,
        comments.filter(comment => comment.commentType === commentType)
      );
    });
  }
  if (sectionKeywords && keywords) {
    convertedData.keywordData = getKeywordsForCategories(
      keywords,
      sectionKeywords
    );
  }
  if (sectionFeatures && features) {
    convertedData.featuresData = features.filter(feature => {
      return sectionFeatures.includes(feature.type);
    });
  }
  if (section && databaseCrossReferences) {
    convertedData.xrefData = getXrefsForSection(
      databaseCrossReferences,
      section
    );
  }
  return convertedData;
};
