import React, { FC, Fragment } from 'react';
import { Bubble } from 'franklin-sites';
import {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../../../model/uniprotkb/UniProtkbConverter';
import FeatureType from '../../../model/types/FeatureType';
import Comment from '../../../model/types/Comment';
import { InteractionComment } from '../components/InteractionView';

const ProteinHighlights: FC<{ data: UniProtkbAPIModel }> = ({ data }) => {
  // FEATURES
  // domains
  let domains, PTMs, variants, mutagenesis, activeSites;
  if (data.features) {
    domains = data.features.filter(
      feature => feature.type === FeatureType.DOMAIN
    );
    // PTMs
    PTMs = data.features.filter(
      feature => feature.type === FeatureType.MOD_RES
    );
    // variants
    variants = data.features.filter(
      feature => feature.type === FeatureType.VARIANT
    );
    // mutagenesis
    mutagenesis = data.features.filter(
      feature => feature.type === FeatureType.MUTAGEN
    );
    // active sites
    activeSites = data.features.filter(
      feature => feature.type === FeatureType.ACT_SITE
    );
  }

  // isoforms
  if (data.comments) {
    const interactionComments = (data.comments.find(
      comment => comment.commentType === Comment.INTERACTION
    ) as unknown) as InteractionComment;
    if (interactionComments) {
      console.log(interactionComments.interactions);
    }
  }
  // 3D structures
  // diseases
  // interactions/tors
  // publications
  // expression
  // subcellular location
  // biotach / distruption phenotype
  return (
    <Fragment>
      {domains && (
        <div>
          <Bubble value={domains.length} />
          Domains
        </div>
      )}
      {PTMs && (
        <div>
          <Bubble value={PTMs.length} />
          PTMs
        </div>
      )}
      {variants && (
        <div>
          <Bubble value={variants.length} />
          Variants
        </div>
      )}
      {mutagenesis && (
        <div>
          <Bubble value={mutagenesis.length} />
          Mutagenesis
        </div>
      )}
      {activeSites && (
        <div>
          <Bubble value={activeSites.length} />
          Active sites
        </div>
      )}
    </Fragment>
  );
};

export default ProteinHighlights;
