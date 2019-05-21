import {
  KeywordData,
  KeywordCategory,
} from '../../../view/uniprotkb/components/KeywordView';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/KeywordTypes';

type SubcellularLocationAPIModel = {
  keywords?: KeywordData;
};

export type SubcellularLocationUIModel = {
  keywordData: KeywordCategory[];
};

export const convertSubcellularLocation = (
  data: SubcellularLocationAPIModel
) => {
  const subcellularLocationData: SubcellularLocationUIModel = {
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
