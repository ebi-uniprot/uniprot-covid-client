import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import { CatalyticActivityData } from '../../../view/uniprotkb/components/CatalyticActivityView';
import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import CommentType from '../../types/CommentType';
import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategories from '../../types/KeywordCategories';
import FeatureTypes from '../../types/FeatureTypes';
import { getXrefsForSection, Xref, XrefUIModel } from '../../utils/XrefUtils';
import EntrySectionType from '../../types/EntrySectionType';

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
  keywordData: KeywordUIModel[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
};

export const convertFunction = (data: FunctionAPIModel) => {
  const functionData: FunctionUIModel = {
    functionCommentsData: [],
    catalyticActivityData: [],
    pathwayCommentsData: [],
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  if (data.comments) {
    functionData.functionCommentsData = data.comments.filter(
      d => d.commentType === CommentType.FUNCTION
    );
    functionData.catalyticActivityData = data.comments.filter(
      d => d.commentType === CommentType.CATALYTIC_ACTIVITY
    );
    functionData.pathwayCommentsData = data.comments.filter(
      d => d.commentType === CommentType.PATHWAY
    );
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategories.MOLECULAR_FUNCTION,
      KeywordCategories.BIOLOGICAL_PROCESS,
      KeywordCategories.LIGAND,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      functionData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [
        FeatureTypes.DOMAIN,
        FeatureTypes.REPEAT,
        FeatureTypes.CA_BIND,
        FeatureTypes.ZN_FING,
        FeatureTypes.DNA_BIND,
        FeatureTypes.NP_BINDL,
        FeatureTypes.REGION,
        FeatureTypes.COILED,
        FeatureTypes.MOTIF,
        FeatureTypes.ACT_SITE,
        FeatureTypes.METAL,
        FeatureTypes.BINDING,
        FeatureTypes.SITE,
      ].includes(feature.type);
    });
    functionData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySectionType.Function
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      functionData.xrefData = xrefs;
    }
  }
  return functionData;
};
