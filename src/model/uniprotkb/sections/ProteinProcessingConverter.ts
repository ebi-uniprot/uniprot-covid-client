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
  commentsData: FreeTextData;
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

export const convertProteinProcessing = (data: ProteinProcessingAPIModel) => {
  const proteinProcessingData: ProteinProcessingUIModel = {
    featuresData: [],
    keywordData: [],
    xrefData: [],
    commentsData: [],
  };
  if (data.comments) {
    proteinProcessingData.commentsData = data.comments.filter(
      d => d.commentType === Comment.PTM
    );
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      proteinProcessingKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      proteinProcessingData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return proteinProcessingFeatures.includes(feature.type);
    });
    proteinProcessingData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.ProteinProcessing
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      proteinProcessingData.xrefData = xrefs;
    }
  }
  return proteinProcessingData;
};
