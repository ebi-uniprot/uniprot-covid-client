import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { APIModel, convertSection } from '../SectionConverter';

const keywordsCategories = [KeywordCategory.CELLULAR_COMPONENT];

const featuresCategories = [FeatureType.TOPO_DOM, FeatureType.TRANSMEM];

const convertSubcellularLocation = (data: APIModel) => {
  return convertSection(
    data,
    undefined,
    keywordsCategories,
    featuresCategories,
    undefined
  );
};

export default convertSubcellularLocation;
