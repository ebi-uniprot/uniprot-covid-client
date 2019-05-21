import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import FeatureTypes from '../../types/FeatureTypes';
import {
  getKeywordsForCategories,
  KeywordUIModel,
  Keyword,
} from '../../utils/KeywordsUtil';
import KeywordCategories from '../../types/KeywordTypes';

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
      KeywordCategories.PTM,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      proteinProcessingData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [
        FeatureTypes.INIT_MET,
        FeatureTypes.SIGNAL,
        FeatureTypes.TRANSIT,
        FeatureTypes.PROPEP,
        FeatureTypes.CHAIN,
        FeatureTypes.PEPTIDE,
        FeatureTypes.MOD_RES,
        FeatureTypes.LIPID,
        FeatureTypes.CARBOHYD,
        FeatureTypes.DISULFID,
        FeatureTypes.CROSSLNK,
      ].includes(feature.type);
    });
    proteinProcessingData.featuresData = features;
  }
  return proteinProcessingData;
};
