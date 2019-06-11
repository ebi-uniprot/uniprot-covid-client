import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import FeatureType from '../../types/FeatureType';

type SubcellularLocationAPIModel = {
  keywords?: Keyword[];
  features?: FeatureData;
};

export type SubcellularLocationUIModel = {
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
};

const subcellularLocationKeywords = [KeywordCategory.CELLULAR_COMPONENT];

const subcellularLocationFeatures = [
  FeatureType.TOPO_DOM,
  FeatureType.TRANSMEM,
];

export const convertSubcellularLocation = (
  data: SubcellularLocationAPIModel
) => {
  const subcellularLocationData: SubcellularLocationUIModel = {
    keywordData: [],
    featuresData: [],
  };
  if (data.features) {
    const features = data.features.filter(feature => {
      return subcellularLocationFeatures.includes(feature.type);
    });
    subcellularLocationData.featuresData = features;
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      subcellularLocationKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      subcellularLocationData.keywordData = categoryKeywords;
    }
  }
  return subcellularLocationData;
};
