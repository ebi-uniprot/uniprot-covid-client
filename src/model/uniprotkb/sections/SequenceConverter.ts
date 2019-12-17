import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import { getXrefsForSection, XrefUIModel } from '../../utils/XrefUtils';
import EntrySection from '../../types/EntrySection';
import { SequenceData } from '../../../view/uniprotkb/components/SequenceView';
import {
  CommentType,
  AlternativeProductsComment,
  SequenceCautionComment,
  MassSpectrometryComment,
  FreeTextComment,
  RNAEditingComment,
} from '../../types/CommentTypes';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

export enum Flag {
  PRECURSOR = 'Precursor',
  FRAGMENT = 'Fragment',
  FRAGMENTS = 'Fragments',
  FRAGMENT_PRECURSOR = 'Fragment,Precursor',
  FRAGMENTS_PRECURSOR = 'Fragments,Precursor',
}

export type EntryAudit = {
  firstPublicDate: string;
  lastAnnotationUpdateDate: string;
  lastSequenceUpdateDate: string;
  entryVersion: number;
  sequenceVersion: number;
};

export type SequenceUIModel = {
  sequence: SequenceData;
  flag?: Flag;
  status?: string;
  processing?: string;
  keywordData: KeywordUIModel[];
  alternativeProducts?: AlternativeProductsComment;
  sequenceCaution?: SequenceCautionComment[];
  massSpectrometry?: MassSpectrometryComment[];
  polymorphysm?: FreeTextComment[];
  rnaEditing?: RNAEditingComment[];
  featuresData: FeatureData;
  xrefData: XrefUIModel[];
  lastUpdateDate?: string;
  entryAudit?: EntryAudit;
  molWeight?: number;
};

const sequenceKeywords = [KeywordCategory.CODING_SEQUENCE_DIVERSITY];

const sequenceFeatures = [
  FeatureType.COMPBIAS,
  FeatureType.NON_STD,
  FeatureType.UNSURE,
  FeatureType.CONFLICT,
  FeatureType.NON_CONS,
  FeatureType.NON_TER,
  FeatureType.VAR_SEQ,
];

export const convertSequence = (data: UniProtkbAPIModel) => {
  const sequenceData: SequenceUIModel = {
    sequence: data.sequence,
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };

  if (data.sequence) {
    sequenceData.molWeight = data.sequence.molWeight;
  }

  // Deal with flags
  if (data.proteinDescription && data.proteinDescription.flag) {
    sequenceData.flag = data.proteinDescription.flag;

    sequenceData.status = [
      Flag.FRAGMENT,
      Flag.FRAGMENTS,
      Flag.FRAGMENTS_PRECURSOR,
      Flag.FRAGMENT_PRECURSOR,
    ].includes(data.proteinDescription.flag)
      ? data.proteinDescription.flag
      : 'Complete';

    sequenceData.processing = [
      Flag.PRECURSOR,
      Flag.FRAGMENTS_PRECURSOR,
      Flag.FRAGMENT_PRECURSOR,
    ].includes(data.proteinDescription.flag)
      ? 'The displayed sequence is further processed into a mature form.'
      : undefined;
  }

  // Add the last update
  if (data.entryAudit) {
    sequenceData.lastUpdateDate = `${data.entryAudit.lastSequenceUpdateDate} v${data.entryAudit.sequenceVersion}`;
    sequenceData.entryAudit = data.entryAudit;
  }

  // Trembl entries only have a canonical sequence
  if (data.comments) {
    const alternativeProducts = data.comments.find(
      comment => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
    );
    sequenceData.alternativeProducts = alternativeProducts as AlternativeProductsComment;
    const sequenceCaution = data.comments.filter(
      comment => comment.commentType === CommentType.SEQUENCE_CAUTION
    );
    sequenceData.sequenceCaution = sequenceCaution as SequenceCautionComment[];
    const massSpec = data.comments.filter(
      comment => comment.commentType === CommentType.MASS_SPECTROMETRY
    );
    sequenceData.massSpectrometry = massSpec as MassSpectrometryComment[];
    const polymorphysm = data.comments.filter(
      comment => comment.commentType === CommentType.POLYMORPHISM
    );
    sequenceData.polymorphysm = polymorphysm as FreeTextComment[];
    const rnaEditing = data.comments.filter(
      comment => comment.commentType === CommentType.RNA_EDITING
    );
    sequenceData.rnaEditing = rnaEditing as RNAEditingComment[];
  }

  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      sequenceKeywords
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      sequenceData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return sequenceFeatures.includes(feature.type);
    });
    sequenceData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.Sequence
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      sequenceData.xrefData = xrefs;
    }
  }
  return sequenceData;
};