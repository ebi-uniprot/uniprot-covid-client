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
): KeywordUIModel[] | null => {
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
