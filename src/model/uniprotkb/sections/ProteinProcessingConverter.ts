import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import FeatureType from '../../types/FeatureType';
import {
  getKeywordsForCategories,
  KeywordUIModel,
  Keyword,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import { Xref, getXrefsForSection, XrefUIModel } from '../../utils/XrefUtils';
import EntrySection from '../../types/EntrySection';
import Comment from '../../types/Comment';

type ProteinProcessingAPIModel = {
  primaryAccession: string;
  keywords?: Keyword[];
  comments?: FreeTextData;
  features?: FeatureData;
  databaseCrossReferences?: Xref[];
};

export type ProteinProcessingUIModel = {
  featuresData: FeatureData;
  keywordData: KeywordUIModel[];
  xrefData: XrefUIModel[];
  commentsData: Map<Comment, FreeTextData>;
};

const proteinProcessingKeywords = [KeywordCategory.PTM];

const proteinProcessingFeatures = [
  FeatureType.INIT_MET,
  FeatureType.SIGNAL,
  FeatureType.TRANSIT,
  FeatureType.PROPEP,
  FeatureType.CHAIN,
  FeatureType.PEPTIDE,
  FeatureType.MOD_RES,
  FeatureType.LIPID,
  FeatureType.CARBOHYD,
  FeatureType.DISULFID,
  FeatureType.CROSSLNK,
];

const proteinProcessingComments = [Comment.PTM];

export const convertProteinProcessing = (data: ProteinProcessingAPIModel) => {
  const proteinProcessingData: ProteinProcessingUIModel = {
    featuresData: [],
    keywordData: [],
    xrefData: [],
    commentsData: new Map(),
  };
  const { comments, keywords, features, databaseCrossReferences } = data;
  if (comments) {
    proteinProcessingComments.forEach(commentType => {
      proteinProcessingData.commentsData.set(
        commentType,
        comments.filter(comment => comment.commentType === commentType)
      );
    });
  }

  if (keywords) {
    const categoryKeywords = getKeywordsForCategories(
      keywords,
      proteinProcessingKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      proteinProcessingData.keywordData = categoryKeywords;
    }
  }
  if (features) {
    proteinProcessingData.featuresData = features.filter(feature => {
      return proteinProcessingFeatures.includes(feature.type);
    });
  }
  if (databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      databaseCrossReferences,
      EntrySection.ProteinProcessing
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      proteinProcessingData.xrefData = xrefs;
    }
  }
  return proteinProcessingData;
};
