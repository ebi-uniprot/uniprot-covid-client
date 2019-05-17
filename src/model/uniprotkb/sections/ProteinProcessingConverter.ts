import { FeatureData } from '../../FeaturesView';
import FeatureTypes from '../../types/featureTypes';
import { KeywordData, KeywordCategory } from '../../Keyword';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/keywordTypes';

type data = {
  keywords?: KeywordData;
  features?: FeatureData;
};

export type ProteinProcessingDataModel = {
  featuresData: FeatureData;
  keywordData: KeywordCategory[];
};

const proteinProcessingConverter = (data: data) => {
  const proteinProcessingData: ProteinProcessingDataModel = {
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

export default proteinProcessingConverter;
