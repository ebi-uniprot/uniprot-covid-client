import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
import { APIModel, convertSection } from '../SectionConverter';

const expressionKeywords = [KeywordCategory.DEVELOPMENTAL_STAGE];

const expressionComments = [Comment.TISSUE_SPECIFICITY, Comment.INDUCTION];

export const convertExpression = (data: APIModel) => {
  return convertSection(
    data,
    expressionComments,
    expressionKeywords,
    undefined,
    EntrySection.Expression
  );
};
