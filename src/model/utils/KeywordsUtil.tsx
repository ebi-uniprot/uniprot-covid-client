import KeywordCategories from '../types/KeywordTypes';

export type Keyword = {
  id?: string;
  value?: string;
  category?: KeywordCategories;
};

export type KeywordUIModel = {
  category: KeywordCategories;
  keywords: Keyword[];
};

export const getKeywordsForCategories = (
  keywords: Keyword[],
  keywordCategories: KeywordCategories[]
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
