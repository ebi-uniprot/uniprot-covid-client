import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
import { APIModel, convertSection } from '../SectionConverter';

const keywordsCategories = [KeywordCategory.DEVELOPMENTAL_STAGE];

const commentsCategories = [Comment.TISSUE_SPECIFICITY, Comment.INDUCTION];

const convertExpression = (data: APIModel) => {
  return convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    undefined,
    EntrySection.Expression
  );
};

export default convertExpression;
