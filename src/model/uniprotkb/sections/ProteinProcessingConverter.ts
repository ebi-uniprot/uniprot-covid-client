import FeatureType from '../../types/FeatureType';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
import Comment from '../../types/Comment';
import { APIModel, convertSection } from '../SectionConverter';

const proteinProcessingKeywords = [KeywordCategory.PTM];

const proteinProcessingFeatures = [
  FeatureType.INIT_MET,
  FeatureType.SIGNAL,
  FeatureType.TRANSIT,
  FeatureType.PROPEP,
  FeatureType.CHAIN,
  FeatureType.PEPTIDE,
  FeatureType.MOD_RES,
  FeatureType.LIPID,
  FeatureType.CARBOHYD,
  FeatureType.DISULFID,
  FeatureType.CROSSLNK,
];

const proteinProcessingComments = [Comment.PTM];

export const convertProteinProcessing = (data: APIModel) => {
  return convertSection(
    data,
    proteinProcessingComments,
    proteinProcessingKeywords,
    proteinProcessingFeatures,
    EntrySection.ProteinProcessing
  );
};
