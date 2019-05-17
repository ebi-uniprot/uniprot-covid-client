import EntrySectionType from '../types/EntrySection';
import functionConverter, {
  FunctionDataModel,
} from './sections/FunctionConverter';
import { FreeTextData } from '../FreeText';
import { CatalyticActivityData } from '../CatalyticActivity';
import { KeywordData } from '../Keyword';
import { FeatureData } from '../FeaturesView';
import { DatabaseCrossReference } from '../XRef';
import pathologyAndBiotechConverter, {
  PathologyAndBiotechDataModel,
} from './sections/PathologyAndBiotechConverter';
import { DiseaseCommentData } from '../DiseaseInvolvement';
import namesAndTaxonomyConverter, {
  NamesAndTaxonomyDataModel,
  ProteinNamesData,
} from './sections/NamesAndTaxonomyConverter';
import proteinProcessingConverter, {
  ProteinProcessingDataModel,
} from './sections/ProteinProcessingConverter';
import expressionConverter, {
  ExpressionDataModel,
} from './sections/ExpressionConverter';
import subcellularLocationConverter, {
  SubcellularLocationDataModel,
} from './sections/SubcellularLocationConverter';
import sequenceConverter, {
  SequenceDataModel,
} from './sections/SequenceConverter';
import { AlternativeProducts, SequenceData } from '../SequenceView';

type data = {
  primaryAccession: string;
  proteinDescription?: ProteinNamesData;
  comments?: FreeTextData &
    CatalyticActivityData &
    DiseaseCommentData &
    AlternativeProducts[];
  keywords?: KeywordData;
  features?: FeatureData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: SequenceData;
};

export type UniProtkbDataModel = {
  primaryAccession: string;
  [EntrySectionType.Function]: FunctionDataModel;
  [EntrySectionType.NamesAndTaxonomy]: NamesAndTaxonomyDataModel;
  [EntrySectionType.SubCellularLocation]: SubcellularLocationDataModel;
  [EntrySectionType.PathologyAndBioTech]: PathologyAndBiotechDataModel;
  [EntrySectionType.ProteinProcessing]: ProteinProcessingDataModel;
  [EntrySectionType.Expression]: ExpressionDataModel;
  [EntrySectionType.Sequence]: SequenceDataModel;
};

const uniProtKbConverter = (data: data): UniProtkbDataModel => {
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
