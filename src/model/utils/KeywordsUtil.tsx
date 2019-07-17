import KeywordCategory from '../types/KeywordCategory';

export type Keyword = {
  id?: string;
  value?: string;
  category?: KeywordCategory;
};

export type KeywordUIModel = {
  category: KeywordCategory;
  keywords: Keyword[];
};

export const getKeywordsForCategories = (
  keywords: Keyword[],
  keywordCategories: KeywordCategory[]
): KeywordUIModel[] => {
  if (!keywords || !keywordCategories) {
    return [];
  }
  const keywordsByCategories = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const category of keywordCategories) {
    const categoryKeywords = keywords.filter(
      keyword => keyword.category === category
    );
    if (categoryKeywords && categoryKeywords.length > 0) {
      keywordsByCategories.push({
        category,
        keywords: categoryKeywords,
      });
    }
  }
  return keywordsByCategories;
};
