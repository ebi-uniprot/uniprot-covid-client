import EntrySection from '../types/EntrySection';
import convertFunction from './FunctionConverter';
import { FeatureData } from '../components/entry/FeaturesView';
import convertPathologyAndBiotech from './PathologyAndBiotechConverter';
import {
  convertNamesAndTaxonomy,
  NamesAndTaxonomyUIModel,
  ProteinNamesData,
  GeneNamesData,
  OrganismData,
  LineageData,
} from './NamesAndTaxonomyConverter';
import convertProteinProcessing from './ProteinProcessingConverter';
import convertExpression from './ExpressionConverter';
import convertSubcellularLocation from './SubcellularLocationConverter';
import {
  convertSequence,
  SequenceUIModel,
  EntryAudit,
} from './SequenceConverter';
import { SequenceData } from '../components/entry/SequenceView';
import { Keyword } from '../utils/KeywordsUtil';
import convertInteraction from './InteractionConverter';
import convertFamilyAndDomains from './FamilyAndDomainsConverter';
import { UIModel } from './SectionConverter';
import convertStructure from './StructureConverter';
import convertExternalLinks from './ExternalLinksConverter';
import Comment, { Xref } from '../types/CommentTypes';
import { transfromProperties } from '../utils/utils';
import { Property } from '../types/modelTypes';
import { Reference } from '../types/LiteratureTypes';

export enum EntryType {
  SWISSPROT = 'UniProtKB reviewed (Swiss-Prot)',
  TREMBL = 'UniProtKB unreviewed (TrEMBL)',
  INACTIVE = 'Inactive',
}

export type UniProtkbAPIModel = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: OrganismData;
  organismHosts?: OrganismData[];
  primaryAccession: string;
  uniProtkbId: string;
  proteinExistence: string;
  entryType: EntryType;
  comments?: Comment[];
  keywords?: Keyword[];
  features?: FeatureData;
  uniProtKBCrossReferences?: Xref[];
  sequence: SequenceData;
  annotationScore: number;
  entryAudit?: EntryAudit;
  references?: Reference[];
  lineages?: LineageData[];
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtkbId: string;
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
  references?: Reference[];
};

export enum InactiveReasonType {
  MERGED = 'MERGED', // We will never see this as this is followed by a 303 redirect
  DEMERGED = 'DEMERGED',
  DELETED = 'DELETED',
}

export type InactiveEntryReason = {
  inactiveReasonType: InactiveReasonType;
  mergeDemergeTo: string[] | [];
};

export type UniProtkbInactiveEntryModel = {
  annotationScore: number;
  entryType: EntryType.INACTIVE;
  inactiveReason: InactiveEntryReason;
  primaryAccession: string;
  uniProtkbId: string;
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

  if (dataCopy.uniProtKBCrossReferences) {
    dataCopy.uniProtKBCrossReferences = convertXrefProperties(
      dataCopy.uniProtKBCrossReferences
    );
  }

  return {
    primaryAccession: dataCopy.primaryAccession,
    uniProtkbId: dataCopy.uniProtkbId,
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
