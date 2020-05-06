import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../utils/utils';
import EntrySection from '../../types/EntrySection';
import KeywordView from './KeywordView';
import FeaturesView from './FeaturesView';
import { UIModel } from '../../adapters/SectionConverter';
import SubcellularLocationView from './SubcellularLocationView';
import {
  SubcellularLocationComment,
  CommentType,
} from '../../types/CommentTypes';

const SubcellularLocationSection: FC<{
  data: UIModel;
  sequence: string;
}> = ({ data, sequence }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.SubCellularLocation}>
      <Card title={EntrySection.SubCellularLocation}>
        <SubcellularLocationView
          comments={
            data.commentsData.get(
              CommentType.SUBCELLULAR_LOCATION
            ) as SubcellularLocationComment[]
          }
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
      </Card>
    </div>
  );
};

export default SubcellularLocationSection;
