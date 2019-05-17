import KeywordTypes from '../types/keywordTypes';
import { KeywordData, KeywordCategory } from '../Keyword';

export const getCategoryKeywords = (
  keywords: KeywordData,
  keywordCategories: KeywordTypes[]
): KeywordCategory[] | null => {
  if (!keywords || !keywordCategories) {
    return null;
  }
  const keywordsByCategories = [];
  for (const category of keywordCategories) {
    const categoryKeywords = keywords.filter(
      keyword => keyword.category === category
    );
    if (categoryKeywords && categoryKeywords.length > 0) {
      keywordsByCategories.push({
        category: category,
        keywords: categoryKeywords,
      });
    }
  }
  return keywordsByCategories;
};
