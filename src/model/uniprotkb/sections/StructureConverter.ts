import FeatureType from '../../types/FeatureType';
import { APIModel, convertSection } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';

const featuresCategories = [FeatureType.HELIX, FeatureType.STRAND];

const convertStructure = (data: APIModel) => {
  return convertSection(
    data,
    undefined,
    undefined,
    featuresCategories,
    EntrySection.Structure
  );
};

export default convertStructure;
