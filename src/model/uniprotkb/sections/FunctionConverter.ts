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
  commentsData: Map<Comment, FreeTextData>;
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

const functionComments = [
  Comment.FUNCTION,
  Comment.CATALYTIC_ACTIVITY,
  Comment.PATHWAY,
  Comment.MISCELLANEOUS,
];

export const convertFunction = (data: FunctionAPIModel) => {
  const functionData: FunctionUIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  const { comments, keywords, features, databaseCrossReferences } = data;
  if (comments) {
    functionComments.forEach(commentType => {
      functionData.commentsData.set(
        commentType,
        comments.filter(comment => comment.commentType === commentType)
      );
    });
  }
  if (keywords) {
    functionData.keywordData = getKeywordsForCategories(
      keywords,
      functionKeywords
    );
  }
  if (features) {
    functionData.featuresData = features.filter(feature => {
      return functionFeatures.includes(feature.type);
    });
  }
  if (databaseCrossReferences) {
    functionData.xrefData = getXrefsForSection(
      databaseCrossReferences,
      EntrySection.Function
    );
  }
  return functionData;
};
