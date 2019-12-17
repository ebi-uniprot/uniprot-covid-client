import EntrySection from '../types/EntrySection';
import convertFunction from './sections/FunctionConverter';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import convertPathologyAndBiotech from './sections/PathologyAndBiotechConverter';
import {
  convertNamesAndTaxonomy,
  NamesAndTaxonomyUIModel,
  ProteinNamesData,
  GeneNamesData,
  OrganismData,
} from './sections/NamesAndTaxonomyConverter';
import convertProteinProcessing from './sections/ProteinProcessingConverter';
import convertExpression from './sections/ExpressionConverter';
import convertSubcellularLocation from './sections/SubcellularLocationConverter';
import {
  convertSequence,
  SequenceUIModel,
  EntryAudit,
} from './sections/SequenceConverter';
import { SequenceData } from '../../view/uniprotkb/components/SequenceView';
import { Keyword } from '../utils/KeywordsUtil';
import convertInteraction from './sections/InteractionConverter';
import convertFamilyAndDomains from './sections/FamilyAndDomainsConverter';
import { UIModel } from './SectionConverter';
import convertStructure from './sections/StructureConverter';
import Comment, { Xref } from '../types/CommentTypes';

export enum EntryType {
  SWISSPROT = 'Swiss-Prot',
  TREMBL = 'TrEMBL',
}

export type Citation = {
  citation: {
    citationType?: string;
    authors?: string[];
    citationXrefs?: Xref[];
    title?: string;
    publicationDate?: number;
    journal?: string;
    firstPage?: number;
    lastPage?: number;
    volume?: number;
  };
  referencePositions?: string[];
  referenceComments?: {
    value: string;
    type: string;
  };
};

export type UniProtkbAPIModel = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: OrganismData;
  organismHosts?: OrganismData[];
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  entryType: EntryType;
  comments?: Comment[];
  keywords?: Keyword[];
  features?: FeatureData;
  databaseCrossReferences?: Xref[];
  sequence: SequenceData;
  annotationScore: number;
  entryAudit?: EntryAudit;
  references?: Citation[];
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtId: string;
  proteinExistence: string;
  entryType: EntryType;
  annotationScore: number;
  [EntrySection.Function]: UIModel;
  [EntrySection.NamesAndTaxonomy]: NamesAndTaxonomyUIModel;
  [EntrySection.SubCellularLocation]: UIModel;
  [EntrySection.PathologyAndBioTech]: UIModel;
  [EntrySection.ProteinProcessing]: UIModel;
  [EntrySection.Expression]: UIModel;
  [EntrySection.Sequence]: SequenceUIModel;
  [EntrySection.Interaction]: UIModel;
  [EntrySection.Structure]: UIModel;
  [EntrySection.FamilyAndDomains]: UIModel;
  references: Citation[];
};

const uniProtKbConverter = (data: UniProtkbAPIModel): UniProtkbUIModel => {
  return {
    primaryAccession: data.primaryAccession,
    uniProtId: data.uniProtId,
    proteinExistence: data.proteinExistence,
    entryType: data.entryType,
    annotationScore: data.annotationScore,
    [EntrySection.Function]: convertFunction(data),
    [EntrySection.NamesAndTaxonomy]: convertNamesAndTaxonomy(data),
    [EntrySection.SubCellularLocation]: convertSubcellularLocation(data),
    [EntrySection.PathologyAndBioTech]: convertPathologyAndBiotech(data),
    [EntrySection.ProteinProcessing]: convertProteinProcessing(data),
    [EntrySection.Expression]: convertExpression(data),
    [EntrySection.Interaction]: convertInteraction(data),
    [EntrySection.Structure]: convertStructure(data),
    [EntrySection.Sequence]: convertSequence(data),
    [EntrySection.FamilyAndDomains]: convertFamilyAndDomains(data),
    references: data.references || [],
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);