import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import FeatureTypes from '../../types/FeatureTypes';
import {
  KeywordData,
  KeywordCategory,
} from '../../../view/uniprotkb/components/KeywordView';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/KeywordTypes';

type ProteinProcessingAPIModel = {
  keywords?: KeywordData;
  features?: FeatureData;
};

export type ProteinProcessingUIModel = {
  featuresData: FeatureData;
  keywordData: KeywordCategory[];
};

export const convertProteinProcessing = (data: ProteinProcessingAPIModel) => {
  const proteinProcessingData: ProteinProcessingUIModel = {
    featuresData: [],
    keywordData: [],
  };
  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.PTM,
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
