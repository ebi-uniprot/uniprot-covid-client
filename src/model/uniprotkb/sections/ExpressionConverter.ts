import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import Comment from '../../types/Comment';
import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
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
      comment => comment.commentType === Comment.TISSUE_SPECIFICITY
    );
    expressionData.inductionData = data.comments.filter(
      comment => comment.commentType === Comment.INDUCTION
    );
  }
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.DEVELOPMENTAL_STAGE,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      expressionData.keywordData = categoryKeywords;
    }
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.Expression
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      expressionData.xrefData = xrefs;
    }
  }
  return expressionData;
};
