import EntrySection from '../types/EntrySection';
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
import { Xref } from '../utils/XrefUtils';
import {
  InteractionUIModel,
  convertInteraction,
} from './sections/InteractionConverter';

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
  databaseCrossReferences?: Xref[];
  sequence: SequenceData;
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  [EntrySection.Function]: FunctionUIModel;
  [EntrySection.NamesAndTaxonomy]: NamesAndTaxonomyUIModel;
  [EntrySection.SubCellularLocation]: SubcellularLocationUIModel;
  [EntrySection.PathologyAndBioTech]: PathologyAndBiotechUIModel;
  [EntrySection.ProteinProcessing]: ProteinProcessingUIModel;
  [EntrySection.Expression]: ExpressionUIModel;
  [EntrySection.Sequence]: SequenceUIModel;
  [EntrySection.Interaction]: InteractionUIModel;
};

const uniProtKbConverter = (data: UniProtkbAPIModel): UniProtkbUIModel => {
  return {
    primaryAccession: data.primaryAccession,
    uniProtId: data.uniProtId,
    proteinExistence: data.proteinExistence,
    [EntrySection.Function]: convertFunction(data),
    [EntrySection.NamesAndTaxonomy]: convertNamesAndTaxonomy(data),
    [EntrySection.SubCellularLocation]: convertSubcellularLocation(data),
    [EntrySection.PathologyAndBioTech]: convertPathologyAndBiotech(data),
    [EntrySection.ProteinProcessing]: convertProteinProcessing(data),
    [EntrySection.Expression]: convertExpression(data),
    [EntrySection.Interaction]: convertInteraction(data),
    [EntrySection.Sequence]: convertSequence(data),
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
