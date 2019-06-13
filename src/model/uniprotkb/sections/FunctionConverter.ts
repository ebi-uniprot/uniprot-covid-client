import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import { convertSection, UIModel, APIModel } from '../SectionConverter';

const functionKeywords = [
  KeywordCategory.MOLECULAR_FUNCTION,
  KeywordCategory.BIOLOGICAL_PROCESS,
  KeywordCategory.LIGAND,
];

const functionFeatures = [
  FeatureType.DOMAIN,
  FeatureType.REPEAT,
  FeatureType.CA_BIND,
  FeatureType.ZN_FING,
  FeatureType.DNA_BIND,
  FeatureType.NP_BINDL,
  FeatureType.REGION,
  FeatureType.COILED,
  FeatureType.MOTIF,
  FeatureType.ACT_SITE,
  FeatureType.METAL,
  FeatureType.BINDING,
  FeatureType.SITE,
];

const functionComments = [
  Comment.FUNCTION,
  Comment.CATALYTIC_ACTIVITY,
  Comment.PATHWAY,
  Comment.MISCELLANEOUS,
];

export const convertFunction = (data: APIModel) => {
  return convertSection(
    data,
    functionComments,
    functionKeywords,
    functionFeatures,
    EntrySection.Function
  );
};
