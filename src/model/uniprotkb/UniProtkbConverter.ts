import EntrySectionType from '../types/EntrySectionType';
import {
  convertFunction,
  FunctionDataModel,
} from './sections/FunctionConverter';
import { FreeTextData } from '../../view/uniprotkb/components/FreeTextView';
import { CatalyticActivityData } from '../../view/uniprotkb/components/CatalyticActivityView';
import { KeywordData } from '../../view/uniprotkb/components/KeywordView';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import { DatabaseCrossReference } from '../../view/uniprotkb/components/XRefView';
import {
  convertPathologyAndBiotech,
  PathologyAndBiotechDataModel,
} from './sections/PathologyAndBiotechConverter';
import { DiseaseCommentData } from '../../view/uniprotkb/components/DiseaseInvolvementView';
import {
  convertNamesAndTaxonomy,
  NamesAndTaxonomyDataModel,
  ProteinNamesData,
} from './sections/NamesAndTaxonomyConverter';
import {
  convertProteinProcessing,
  ProteinProcessingDataModel,
} from './sections/ProteinProcessingConverter';
import {
  convertExpression,
  ExpressionDataModel,
} from './sections/ExpressionConverter';
import {
  convertSubcellularLocation,
  SubcellularLocationDataModel,
} from './sections/SubcellularLocationConverter';
import {
  convertSequence,
  SequenceDataModel,
} from './sections/SequenceConverter';
import {
  AlternativeProducts,
  SequenceData,
} from '../../view/uniprotkb/components/SequenceView';

export type UniProtkbAPIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
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

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  [EntrySectionType.Function]: FunctionDataModel;
  [EntrySectionType.NamesAndTaxonomy]: NamesAndTaxonomyDataModel;
  [EntrySectionType.SubCellularLocation]: SubcellularLocationDataModel;
  [EntrySectionType.PathologyAndBioTech]: PathologyAndBiotechDataModel;
  [EntrySectionType.ProteinProcessing]: ProteinProcessingDataModel;
  [EntrySectionType.Expression]: ExpressionDataModel;
  [EntrySectionType.Sequence]: SequenceDataModel;
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
