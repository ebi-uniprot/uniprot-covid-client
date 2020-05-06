import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from './FeaturesView';
import DiseaseInvolvementView from './DiseaseInvolvementView';
import KeywordView from './KeywordView';
import EntrySection from '../../types/EntrySection';
import { hasContent } from '../../utils/utils';
import { UIModel } from '../../adapters/SectionConverter';
import {
  CommentType,
  DiseaseComment,
  FreeTextComment,
} from '../../types/CommentTypes';
import XRefView from './XRefView';
import VariationView from './VariationView';
import FreeTextView from './FreeTextView';

const PathologyAndBiotechSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, primaryAccession, sequence }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.PathologyAndBioTech}>
      <Card title={EntrySection.PathologyAndBioTech}>
        <DiseaseInvolvementView
          comments={
            data.commentsData.get(CommentType.DISEASE) as DiseaseComment[]
          }
          primaryAccession={primaryAccession}
          includeTitle
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.ALLERGEN) as FreeTextComment[]
          }
          title={CommentType.ALLERGEN.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.BIOTECHNOLOGY
            ) as FreeTextComment[]
          }
          title={CommentType.BIOTECHNOLOGY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.DISRUPTION_PHENOTYPE
            ) as FreeTextComment[]
          }
          title={CommentType.DISRUPTION_PHENOTYPE.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.PHARMACEUTICAL
            ) as FreeTextComment[]
          }
          title={CommentType.PHARMACEUTICAL.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.TOXIC_DOSE) as FreeTextComment[]
          }
          title={CommentType.TOXIC_DOSE.toLowerCase()}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <VariationView primaryAccession={primaryAccession} title="Variants" />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default PathologyAndBiotechSection;
