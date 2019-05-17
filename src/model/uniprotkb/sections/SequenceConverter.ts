import { KeywordCategory, KeywordData } from '../../Keyword';
import { FeatureData } from '../../FeaturesView';
import { XrefCategory, DatabaseCrossReference } from '../../XRef';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/keywordTypes';
import FeatureTypes from '../../types/featureTypes';
import { getCategoryXrefs } from '../../utils/XrefUtils';
import EntrySectionType from '../../types/EntrySection';
import { ProteinDescriptionDefault } from '../../ProteinNames';
import { Flag, AlternativeProducts } from '../../SequenceView';
import CommentType from '../../types/commentType';

type data = {
  primaryAccession: string;
  keywords?: KeywordData;
  features?: FeatureData;
  comments?: AlternativeProducts[];
  databaseCrossReferences?: DatabaseCrossReference[];
  proteinDescription?: ProteinDescriptionDefault;
  sequence: { value: string };
  entryAudit?: {
    lastSequenceUpdateDate: string;
    sequenceVersion: string;
  };
};

const sequenceConverter = (data: data) => {
  const sequenceData: {
    sequence: { value: string };
    status?: string;
    processing?: string;
    keywordData?: KeywordCategory[];
    alternativeProducts?: AlternativeProducts;
    featuresData?: FeatureData;
    xrefData?: XrefCategory[];
    lastUpdateDate?: string;
  } = { sequence: data.sequence };

  // Deal with flags
  if (data.proteinDescription && data.proteinDescription.flag) {
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
    sequenceData.lastUpdateDate = `${data.entryAudit.lastSequenceUpdateDate} v${
      data.entryAudit.sequenceVersion
    }`;
  }

  // Trembl entries only have a canonical sequence
  if (data.comments) {
    sequenceData.alternativeProducts = data.comments.find(
      comment => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
    );
  }

  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.CODING_SEQUENCE_DIVERSITY,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      sequenceData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [
        FeatureTypes.COMPBIAS,
        FeatureTypes.NON_STD,
        FeatureTypes.UNSURE,
        FeatureTypes.CONFLICT,
        FeatureTypes.NON_CONS,
        FeatureTypes.NON_TER,
      ].includes(feature.type);
    });
    sequenceData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getCategoryXrefs(
      data.databaseCrossReferences,
      EntrySectionType.Sequence
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      sequenceData.xrefData = xrefs;
    }
  }
  return sequenceData;
};

export default sequenceConverter;
