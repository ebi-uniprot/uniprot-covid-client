import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';

type SubcellularLocationAPIModel = {
  keywords?: Keyword[];
};

export type SubcellularLocationUIModel = {
  keywordData: KeywordUIModel[];
};

const subcellularLocationKeywords = [KeywordCategory.CELLULAR_COMPONENT];

export const convertSubcellularLocation = (
  data: SubcellularLocationAPIModel
) => {
  const subcellularLocationData: SubcellularLocationUIModel = {
    keywordData: [],
  };
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      subcellularLocationKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      subcellularLocationData.keywordData = categoryKeywords;
    }
  }
  return subcellularLocationData;
};
