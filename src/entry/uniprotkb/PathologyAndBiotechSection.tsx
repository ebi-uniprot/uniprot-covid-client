import React, { FC, Fragment } from 'react';
import FeatureTypes from '../../model/types/featureTypes';
import FeaturesView, { FeatureData } from '../../model/FeaturesView';

type data = FeatureData;

const PathologyAndBiotechSection: FC<{ entryData: data }> = ({ entryData }) => {
  return (
    <Fragment>
      <FeaturesView data={entryData} types={[FeatureTypes.MUTAGEN]} />
    </Fragment>
  );
};

export default PathologyAndBiotechSection;
