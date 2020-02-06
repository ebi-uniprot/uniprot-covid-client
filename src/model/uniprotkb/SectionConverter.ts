import { getXrefsForSection, XrefUIModel } from '../utils/XrefUtils';
import Comment, { CommentType } from '../types/CommentTypes';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../utils/KeywordsUtil';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import EntrySection from '../types/EntrySection';
import KeywordCategory from '../types/KeywordCategory';
import FeatureType from '../types/FeatureType';
import { UniProtkbAPIModel } from './UniProtkbConverter';
import idx from 'idx';

export type UIModel = {
  commentsData: Map<CommentType, Comment[]>;
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

export const convertSection = (
  data: UniProtkbAPIModel,
  sectionComments?: CommentType[],
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

  const {
    comments,
    keywords,
    features,
    databaseCrossReferences,
    genes,
    organism,
    uniProtId,
  } = data;
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
    const commonName = idx(organism, o => o.commonName);
    // These are needed because the implicit database GPCRDB depends on the existence of a similarity
    // comment with the text "Belongs to the G-protein coupled receptor"'],
    const similarityComments = convertedData.commentsData.get(
      CommentType.SIMILARITY
    );
    convertedData.xrefData = getXrefsForSection(
      databaseCrossReferences,
      section,
      genes,
      commonName,
      similarityComments,
      uniProtId
    );
  }
  return convertedData;
};
