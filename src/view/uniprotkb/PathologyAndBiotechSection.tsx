import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from './components/FeaturesView';
import DiseaseInvolvementView from './components/DiseaseInvolvementView';
import KeywordView from './components/KeywordView';
import EntrySection from '../../model/types/EntrySection';
import hasContent from '../../model/utils/utils';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import {
  CommentType,
  DiseaseComment,
  FreeTextComment,
} from '../../model/types/CommentTypes';
import XRefView from './components/XRefView';
import VariationView from './components/VariationView';
import FreeTextView from './components/FreeTextView';

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
