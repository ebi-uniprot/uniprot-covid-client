import EntrySectionType from '../types/EntrySection';
import functionConverter from './sections/FunctionConverter';
import { FreeTextData } from '../FreeText';
import { CatalyticActivityData } from '../CatalyticActivity';
import { KeywordData } from '../Keyword';
import { FeatureData } from '../FeaturesView';
import { DatabaseCrossReference } from '../XRef';
import pathologyAndBiotechConverter from './sections/PathologyAndBiotechConverter';
import { DiseaseCommentData } from '../DiseaseInvolvement';
import namesAndTaxonomyConverter from './sections/NamesAndTaxonomyConverter';
import proteinProcessingConverter from './sections/ProteinProcessingConverter';
import expressionConverter from './sections/ExpressionConverter';
import subcellularLocationConverter from './sections/SubcellularLocationConverter';
import sequenceConverter from './sections/SequenceConverter';

type data = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData & DiseaseCommentData;
  keywords?: KeywordData;
  features?: FeatureData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};

const uniProtKbConverter = (data: data) => {
  return {
    primaryAccession: data.primaryAccession,
    [EntrySectionType.Function]: functionConverter(data),
    [EntrySectionType.NamesAndTaxonomy]: namesAndTaxonomyConverter(data),
    [EntrySectionType.SubCellularLocation]: subcellularLocationConverter(data),
    [EntrySectionType.PathologyAndBioTech]: pathologyAndBiotechConverter(data),
    [EntrySectionType.ProteinProcessing]: proteinProcessingConverter(data),
    [EntrySectionType.Expression]: expressionConverter(data),
    [EntrySectionType.Sequence]: sequenceConverter(data),
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.FamilyAndDomains, [
//   KeywordCategory.DOMAIN,
// ]);
