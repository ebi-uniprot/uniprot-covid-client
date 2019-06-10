import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import { CatalyticActivityData } from '../../../view/uniprotkb/components/CatalyticActivityView';
import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import Comment from '../../types/Comment';
import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { getXrefsForSection, Xref, XrefUIModel } from '../../utils/XrefUtils';
import EntrySection from '../../types/EntrySection';

type FunctionAPIModel = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData;
  keywords?: Keyword[];
  features?: FeatureData;
  databaseCrossReferences?: Xref[];
  sequence: { value: string };
};

export type FunctionUIModel = {
  functionCommentsData: FreeTextData;
  catalyticActivityData: CatalyticActivityData;
  pathwayCommentsData: FreeTextData;
  miscellaneousData: FreeTextData;
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

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

export const convertFunction = (data: FunctionAPIModel) => {
  const functionData: FunctionUIModel = {
    functionCommentsData: [],
    catalyticActivityData: [],
    pathwayCommentsData: [],
    miscellaneousData: [],
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  if (data.comments) {
    functionData.functionCommentsData = data.comments.filter(
      d => d.commentType === Comment.FUNCTION
    );
    functionData.catalyticActivityData = data.comments.filter(
      d => d.commentType === Comment.CATALYTIC_ACTIVITY
    );
    functionData.pathwayCommentsData = data.comments.filter(
      d => d.commentType === Comment.PATHWAY
    );
    functionData.miscellaneousData = data.comments.filter(
      d => d.commentType === Comment.MISCELLANEOUS
    );
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      functionKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      functionData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return functionFeatures.includes(feature.type);
    });
    functionData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.Function
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      functionData.xrefData = xrefs;
    }
  }
  return functionData;
};
