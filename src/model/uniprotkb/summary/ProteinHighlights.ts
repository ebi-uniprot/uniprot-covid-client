import { UniProtkbAPIModel } from '../UniProtkbConverter';
import FeatureType from '../../types/FeatureType';
import {
  CommentType,
  InteractionComment,
  DiseaseComment,
  AlternativeProductsComment,
} from '../../types/CommentTypes';
import { FeatureData } from '../../../view/uniprotkb/components/FeaturesView';
import EntrySection from '../../types/EntrySection';

enum highlightSection {
  domains = 'domain',
  PTM = 'PTM',
  variants = 'reviewed variant',
  activeSites = 'active site',
  isoforms = 'isoform',
  structures = '3D structure',
  disease = 'disease',
  interactions = 'interaction',
  subcell = 'subcellular location',
  publications = 'reviewed publication',
}

const highlightToEntrySection = {
  [highlightSection.domains]: `#${EntrySection.Function}`,
  [highlightSection.PTM]: `#${EntrySection.ProteinProcessing}`,
  [highlightSection.variants]: `#${EntrySection.PathologyAndBioTech}`,
  [highlightSection.activeSites]: `#${EntrySection.Function}`,
  [highlightSection.isoforms]: `#${EntrySection.Sequence}`,
  [highlightSection.structures]: `#${EntrySection.Structure}`,
  [highlightSection.disease]: `#${EntrySection.PathologyAndBioTech}`,
  [highlightSection.interactions]: `#${EntrySection.Interaction}`,
  [highlightSection.subcell]: `#${EntrySection.SubCellularLocation}`,
  [highlightSection.publications]: '/publications',
};

const getFeatureCount = (features: FeatureData, type: FeatureType) =>
  features.filter(feature => feature.type === type).length;

const getProteinHighlights = (data: UniProtkbAPIModel) => {
  const highlightsMap = new Map<highlightSection, number>();
  const {
    primaryAccession,
    features,
    comments,
    databaseCrossReferences,
    references,
  } = data;

  // FEATURES
  if (features) {
    // domains
    highlightsMap.set(
      highlightSection.domains,
      getFeatureCount(features, FeatureType.DOMAIN)
    );

    // PTMs
    highlightsMap.set(
      highlightSection.PTM,
      getFeatureCount(features, FeatureType.MOD_RES)
    );

    // variants
    highlightsMap.set(
      highlightSection.variants,
      getFeatureCount(features, FeatureType.VARIANT)
    );

    // active sites
    highlightsMap.set(
      highlightSection.activeSites,
      getFeatureCount(features, FeatureType.ACT_SITE)
    );
  }

  if (comments) {
    // isoforms
    const isoformsComments = comments.find(
      comment => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
    ) as AlternativeProductsComment;
    highlightsMap.set(
      highlightSection.isoforms,
      isoformsComments ? isoformsComments.isoforms.length : 0
    );

    // interactions
    const interactionComments = comments.find(
      comment => comment.commentType === CommentType.INTERACTION
    ) as InteractionComment;
    highlightsMap.set(
      highlightSection.interactions,
      interactionComments ? interactionComments.interactions.length : 0
    );

    // diseases
    const diseaseComments = comments.filter(
      comment => comment.commentType === CommentType.DISEASE
    ) as DiseaseComment[];
    highlightsMap.set(highlightSection.disease, diseaseComments.length);
  }

  // XREFS
  // 3D structures
  if (databaseCrossReferences) {
    const structures = databaseCrossReferences.filter(
      databaseCrossReference => databaseCrossReference.databaseType === 'PDB'
    );
    highlightsMap.set(highlightSection.structures, structures.length);
  }

  // publications
  if (references) {
    highlightsMap.set(highlightSection.publications, references.length);
  }

  return Array.from(highlightsMap.keys())
    .filter(highlightKey => highlightsMap.get(highlightKey))
    .map(highlightKey => {
      const count = highlightsMap.get(highlightKey);
      return {
        link: `/uniprotkb/${primaryAccession}${highlightToEntrySection[highlightKey]}`,
        name: `${count} ${highlightKey}${count && count > 1 ? 's' : ''}`,
      };
    });
};

export default getProteinHighlights;
