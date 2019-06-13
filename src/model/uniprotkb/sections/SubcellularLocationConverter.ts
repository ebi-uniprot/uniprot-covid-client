import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { APIModel, convertSection } from '../SectionConverter';

const subcellularLocationKeywords = [KeywordCategory.CELLULAR_COMPONENT];

const subcellularLocationFeatures = [
  FeatureType.TOPO_DOM,
  FeatureType.TRANSMEM,
];

export const convertSubcellularLocation = (data: APIModel) => {
  return convertSection(
    data,
    undefined,
    subcellularLocationKeywords,
    subcellularLocationFeatures,
    undefined
  );
};
