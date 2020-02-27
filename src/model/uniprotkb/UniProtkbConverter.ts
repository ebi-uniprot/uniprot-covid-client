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
import convertExternalLinks from './sections/ExternalLinksConverter';
import Comment, { Xref } from '../types/CommentTypes';
import { transfromProperties } from '../utils/utils';
import { Property } from '../types/modelTypes';

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
    authoringGroup?: string[];
    submissionDatabase?: string;
  };
  referencePositions?: string[];
  referenceComments?: {
    value: string;
    type: string;
  }[];
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
  [EntrySection.ExternalLinks]: UIModel;
  references?: Citation[];
};

export const convertXrefProperties = (xrefs: Xref[]) =>
  xrefs.map(xref => ({
    ...xref,
    properties: xref.properties
      ? transfromProperties((xref.properties as unknown) as Property[])
      : {},
  }));

const uniProtKbConverter = (data: UniProtkbAPIModel): UniProtkbUIModel => {
  const dataCopy = { ...data };

  if (dataCopy.databaseCrossReferences) {
    dataCopy.databaseCrossReferences = convertXrefProperties(
      dataCopy.databaseCrossReferences
    );
  }

  return {
    primaryAccession: dataCopy.primaryAccession,
    uniProtId: dataCopy.uniProtId,
    proteinExistence: dataCopy.proteinExistence,
    entryType: dataCopy.entryType,
    annotationScore: dataCopy.annotationScore,
    [EntrySection.Function]: convertFunction(dataCopy),
    [EntrySection.NamesAndTaxonomy]: convertNamesAndTaxonomy(dataCopy),
    [EntrySection.SubCellularLocation]: convertSubcellularLocation(dataCopy),
    [EntrySection.PathologyAndBioTech]: convertPathologyAndBiotech(dataCopy),
    [EntrySection.ProteinProcessing]: convertProteinProcessing(dataCopy),
    [EntrySection.Expression]: convertExpression(dataCopy),
    [EntrySection.Interaction]: convertInteraction(dataCopy),
    [EntrySection.Structure]: convertStructure(dataCopy),
    [EntrySection.Sequence]: convertSequence(dataCopy),
    [EntrySection.FamilyAndDomains]: convertFamilyAndDomains(dataCopy),
    [EntrySection.ExternalLinks]: convertExternalLinks(dataCopy),
    references: dataCopy.references || [],
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);
