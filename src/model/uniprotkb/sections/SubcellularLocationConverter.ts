import {
  getKeywordsForCategories,
  Keyword,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategories from '../../types/KeywordTypes';

type SubcellularLocationAPIModel = {
  keywords?: Keyword[];
};

export type SubcellularLocationUIModel = {
  keywordData: KeywordUIModel[];
};

export const convertSubcellularLocation = (
  data: SubcellularLocationAPIModel
) => {
  const subcellularLocationData: SubcellularLocationUIModel = {
    keywordData: [],
  };
  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategories.CELLULAR_COMPONENT,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      subcellularLocationData.keywordData = categoryKeywords;
    }
  }
  return subcellularLocationData;
};
