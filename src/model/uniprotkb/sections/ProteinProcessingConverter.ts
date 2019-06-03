import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import FeatureType from '../../types/FeatureType';
import {
  getKeywordsForCategories,
  KeywordUIModel,
  Keyword,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';

type ProteinProcessingAPIModel = {
  keywords?: Keyword[];
  features?: FeatureData;
};

export type ProteinProcessingUIModel = {
  featuresData: FeatureData;
  keywordData: KeywordUIModel[];
};

export const convertProteinProcessing = (data: ProteinProcessingAPIModel) => {
  const proteinProcessingData: ProteinProcessingUIModel = {
    featuresData: [],
    keywordData: [],
  };
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.PTM,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      proteinProcessingData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [
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
      ].includes(feature.type);
    });
    proteinProcessingData.featuresData = features;
  }
  return proteinProcessingData;
};
