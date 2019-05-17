import { KeywordData, KeywordCategory } from '../../Keyword';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/keywordTypes';

type data = {
  keywords?: KeywordData;
};

export type SubcellularLocationDataModel = {
  keywordData: KeywordCategory[];
};

const subcellularLocationConverter = (data: data) => {
  const subcellularLocationData: SubcellularLocationDataModel = {
    keywordData: [],
  };
  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.CELLULAR_COMPONENT,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      subcellularLocationData.keywordData = categoryKeywords;
    }
  }
  return subcellularLocationData;
};

export default subcellularLocationConverter;
