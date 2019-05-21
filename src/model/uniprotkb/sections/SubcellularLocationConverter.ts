import {
  KeywordData,
  KeywordCategory,
} from '../../../view/uniprotkb/components/KeywordView';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/KeywordTypes';

type data = {
  keywords?: KeywordData;
};

export type SubcellularLocationDataModel = {
  keywordData: KeywordCategory[];
};

export const convertSubcellularLocation = (data: data) => {
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
