import { KeywordData } from '../../Keyword';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/keywordTypes';

type data = {
  keywords?: KeywordData;
};

const subcellularLocationConverter = (data: data) => {
  const subcellularLocationData: { keywordData?: KeywordData } = {};
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
