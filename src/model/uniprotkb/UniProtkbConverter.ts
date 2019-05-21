import EntrySectionType from '../types/EntrySectionType';
import { convertFunction, FunctionUIModel } from './sections/FunctionConverter';
import { FreeTextData } from '../../view/uniprotkb/components/FreeTextView';
import { CatalyticActivityData } from '../../view/uniprotkb/components/CatalyticActivityView';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import {
  convertPathologyAndBiotech,
  PathologyAndBiotechUIModel,
} from './sections/PathologyAndBiotechConverter';
import { DiseaseCommentData } from '../../view/uniprotkb/components/DiseaseInvolvementView';
import {
  convertNamesAndTaxonomy,
  NamesAndTaxonomyUIModel,
  ProteinNamesData,
} from './sections/NamesAndTaxonomyConverter';
import {
  convertProteinProcessing,
  ProteinProcessingUIModel,
} from './sections/ProteinProcessingConverter';
import {
  convertExpression,
  ExpressionUIModel,
} from './sections/ExpressionConverter';
import {
  convertSubcellularLocation,
  SubcellularLocationUIModel,
} from './sections/SubcellularLocationConverter';
import { convertSequence, SequenceUIModel } from './sections/SequenceConverter';
import {
  AlternativeProducts,
  SequenceData,
} from '../../view/uniprotkb/components/SequenceView';
import { Keyword } from '../utils/KeywordsUtil';
import { DatabaseCrossReference } from '../utils/XrefUtils';

export type UniProtkbAPIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  proteinDescription?: ProteinNamesData;
  comments?: FreeTextData &
    CatalyticActivityData &
    DiseaseCommentData &
    AlternativeProducts[];
  keywords?: Keyword[];
  features?: FeatureData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: SequenceData;
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  [EntrySectionType.Function]: FunctionUIModel;
  [EntrySectionType.NamesAndTaxonomy]: NamesAndTaxonomyUIModel;
  [EntrySectionType.SubCellularLocation]: SubcellularLocationUIModel;
  [EntrySectionType.PathologyAndBioTech]: PathologyAndBiotechUIModel;
  [EntrySectionType.ProteinProcessing]: ProteinProcessingUIModel;
  [EntrySectionType.Expression]: ExpressionUIModel;
  [EntrySectionType.Sequence]: SequenceUIModel;
};

const uniProtKbConverter = (data: UniProtkbAPIModel): UniProtkbUIModel => {
  return {
    primaryAccession: data.primaryAccession,
    uniProtId: data.uniProtId,
    proteinExistence: data.proteinExistence,
    [EntrySectionType.Function]: convertFunction(data),
    [EntrySectionType.NamesAndTaxonomy]: convertNamesAndTaxonomy(data),
    [EntrySectionType.SubCellularLocation]: convertSubcellularLocation(data),
    [EntrySectionType.PathologyAndBioTech]: convertPathologyAndBiotech(data),
    [EntrySectionType.ProteinProcessing]: convertProteinProcessing(data),
    [EntrySectionType.Expression]: convertExpression(data),
    [EntrySectionType.Sequence]: convertSequence(data),
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
