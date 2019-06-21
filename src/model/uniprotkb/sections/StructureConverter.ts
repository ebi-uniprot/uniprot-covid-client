import FeatureType from '../../types/FeatureType';
import { APIModel, convertSection } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';

const featuresCategories = [FeatureType.HELIX, FeatureType.STRAND];

export const convertStructure = (data: APIModel) => {
  return convertSection(
    data,
    undefined,
    undefined,
    featuresCategories,
    EntrySection.Structure
  );
};
