import { FreeTextData } from '../../FreeText';
import { CatalyticActivityData } from '../../CatalyticActivity';
import { KeywordCategory, KeywordData } from '../../Keyword';
import { FeatureData } from '../../FeaturesView';
import { XrefCategory, DatabaseCrossReference } from '../../XRef';
import CommentType from '../../types/CommentType';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/KeywordTypes';
import FeatureTypes from '../../types/FeatureTypes';
import { getCategoryXrefs } from '../../utils/XrefUtils';
import EntrySectionType from '../../types/EntrySectionType';

type data = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData;
  keywords?: KeywordData;
  features?: FeatureData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};

export type FunctionDataModel = {
  functionCommentsData: FreeTextData;
  catalyticActivityData: CatalyticActivityData;
  pathwayCommentsData: FreeTextData;
  keywordData: KeywordCategory[];
  featuresData: FeatureData;
  xrefData: XrefCategory[];
};

export const convertFunction = (data: data) => {
  const functionData: FunctionDataModel = {
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
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.MOLECULAR_FUNCTION,
      KeywordTypes.BIOLOGICAL_PROCESS,
      KeywordTypes.LIGAND,
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
    const xrefs = getCategoryXrefs(
      data.databaseCrossReferences,
      EntrySectionType.Function
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      functionData.xrefData = xrefs;
    }
  }
  return functionData;
};
