import FeatureType from '../../types/FeatureType';
import { convertSection, UIModel } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { groupBy } from '../../../utils/utils';
import { Xref } from '../../types/CommentTypes';

export type StructureUIModel = {
  structures?: Map<string, Xref[]>;
} & UIModel;

const featuresCategories = [FeatureType.HELIX, FeatureType.STRAND];

const convertStructure = (data: UniProtkbAPIModel) => {
  const structureData: StructureUIModel = convertSection(
    data,
    undefined,
    undefined,
    featuresCategories,
    EntrySection.Structure
  );
  // Extract xrefs to PDB
  if (data.databaseCrossReferences) {
    const structureInfo = data.databaseCrossReferences
      .filter(ref => ref.databaseType === 'PDB')
      .map(item => {
        const method =
          item.properties &&
          item.properties.find(property => property.key === 'Method');
        return { ...item, method: method ? method.value : '' };
      });
    const groupedStructureInfo = groupBy(
      structureInfo,
      (item: { method: string }) => item.method
    );
    structureData.structures = groupedStructureInfo;
  }
  return structureData;
};

export default convertStructure;
