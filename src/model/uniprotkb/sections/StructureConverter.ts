import { groupBy } from 'lodash';
import FeatureType from '../../types/FeatureType';
import { convertSection, UIModel } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { Xref } from '../../types/CommentTypes';

type GroupedStructureInfo = { [key: string]: Xref[] };

export type StructureUIModel = {
  structures?: GroupedStructureInfo;
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
        const method = item.properties && item.properties.Method;
        return { ...item, method };
      });
    const groupedStructureInfo = groupBy(
      structureInfo,
      (item: { method: string }) => item.method
    );
    structureData.structures = groupedStructureInfo as GroupedStructureInfo;
  }
  return structureData;
};

export default convertStructure;
