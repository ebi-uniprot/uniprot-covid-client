import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import KeywordView from './components/KeywordView';
import FeaturesView from './components/FeaturesView';
import { UIModel } from '../../model/uniprotkb/SectionConverter';

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
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
      </Card>
    </div>
  );
};

export default SubcellularLocationSection;
