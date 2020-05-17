import { groupBy } from 'lodash-es';
import FeatureType from '../types/featureType';
import { convertSection, UIModel } from './sectionConverter';
import EntrySection from '../types/entrySection';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../types/commentTypes';

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
  if (data.uniProtKBCrossReferences) {
    const structureInfo = data.uniProtKBCrossReferences
      .filter((ref) => ref.database === 'PDB')
      .map((item) => {
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
