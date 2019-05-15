import KeywordCategory from '../types/keywordTypes';
import Keyword from '../Keyword';

export const getCategoryKeywords = (
  keywords: Keyword[],
  keywordCategories: KeywordCategory[]
) => {
  if (!keywords || !keywordCategories) {
    return null;
  }
  const foundCategoryToKeywords: { [keywordCategory: string]: Keyword[] } = {};
  for (const keyword of keywords) {
    const { category, value, id } = keyword;
    if (!category || !value || !id || !keywordCategories.includes(category)) {
      continue;
    }
    if (category in foundCategoryToKeywords) {
      foundCategoryToKeywords[category].push(keyword);
    } else {
      foundCategoryToKeywords[category] = [keyword];
    }
  }
  return foundCategoryToKeywords;
};
