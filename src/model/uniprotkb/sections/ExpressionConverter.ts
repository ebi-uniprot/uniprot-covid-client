import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import {
  KeywordData,
  KeywordCategory,
} from '../../../view/uniprotkb/components/KeywordView';
import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import CommentType from '../../types/CommentType';
import {
  DatabaseCrossReference,
  XrefCategory,
} from '../../../view/uniprotkb/components/XRefView';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/KeywordTypes';
import EntrySectionType from '../../types/EntrySectionType';
import { getCategoryXrefs } from '../../utils/XrefUtils';

type ExpressionAPIModel = {
  primaryAccession: string;
  features?: FeatureData;
  comments?: FreeTextData;
  keywords?: KeywordData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};

export type ExpressionUIModel = {
  tissueSpecificityData: FreeTextData;
  inductionData: FreeTextData;
  xrefData: XrefCategory[];
  keywordData: KeywordCategory[];
};

export const convertExpression = (data: ExpressionAPIModel) => {
  const expressionData: ExpressionUIModel = {
    tissueSpecificityData: [],
    inductionData: [],
    xrefData: [],
    keywordData: [],
  };
  if (data.comments) {
    expressionData.tissueSpecificityData = data.comments.filter(
      comment => comment.commentType === CommentType.TISSUE_SPECIFICITY
    );
    expressionData.inductionData = data.comments.filter(
      comment => comment.commentType === CommentType.INDUCTION
    );
  }
  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.DEVELOPMENTAL_STAGE,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      expressionData.keywordData = categoryKeywords;
    }
  }
  if (data.databaseCrossReferences) {
    const xrefs = getCategoryXrefs(
      data.databaseCrossReferences,
      EntrySectionType.Expression
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      expressionData.xrefData = xrefs;
    }
  }
  return expressionData;
};
