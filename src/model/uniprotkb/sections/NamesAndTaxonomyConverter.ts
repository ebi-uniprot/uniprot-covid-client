import processProteinData from '../ProteinNamesConverter';
import { IDXOptional } from 'idx';

const namesAndTaxonomyConverter = data => {
  const namesAndTaxonomyData: {
    proteinNamesData?: {
      recommendedName?: IDXOptional<string>;
      shortNames?: IDXOptional<string>;
      alternativeNames?: string[];
    };
  } = {};
  namesAndTaxonomyData.proteinNamesData = processProteinData(data);
  return namesAndTaxonomyData;
};

export default namesAndTaxonomyConverter;
