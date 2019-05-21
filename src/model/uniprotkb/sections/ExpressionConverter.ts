import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import CommentType from '../../types/CommentType';
import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategories from '../../types/KeywordTypes';
import EntrySectionType from '../../types/EntrySectionType';
import { getXrefsForSection, Xref, XrefUIModel } from '../../utils/XrefUtils';

type ExpressionAPIModel = {
  primaryAccession: string;
  features?: FeatureData;
  comments?: FreeTextData;
  keywords?: Keyword[];
  databaseCrossReferences?: Xref[];
  sequence: { value: string };
};

export type ExpressionUIModel = {
  tissueSpecificityData: FreeTextData;
  inductionData: FreeTextData;
  xrefData: XrefUIModel[];
  keywordData: KeywordUIModel[];
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
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategories.DEVELOPMENTAL_STAGE,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      expressionData.keywordData = categoryKeywords;
    }
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySectionType.Expression
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      expressionData.xrefData = xrefs;
    }
  }
  return expressionData;
};
