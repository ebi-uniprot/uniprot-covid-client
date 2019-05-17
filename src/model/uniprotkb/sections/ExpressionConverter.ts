import { FeatureData } from '../../FeaturesView';
import { KeywordData, KeywordCategory } from '../../Keyword';
import { FreeTextData } from '../../FreeText';
import CommentType from '../../types/commentType';
import { DatabaseCrossReference, XrefCategory } from '../../XRef';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/keywordTypes';
import EntrySectionType from '../../types/EntrySection';
import { getCategoryXrefs } from '../../utils/XrefUtils';

type data = {
  primaryAccession: string;
  features?: FeatureData;
  comments?: FreeTextData;
  keywords?: KeywordData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};

export type ExpressionDataModel = {
  tissueSpecificityData: FreeTextData;
  inductionData: FreeTextData;
  xrefData: XrefCategory[];
  keywordData: KeywordCategory[];
};

const expressionConverter = (data: data) => {
  const expressionData: ExpressionDataModel = {
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

export default expressionConverter;
