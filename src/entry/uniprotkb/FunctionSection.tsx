import React, { Fragment, FC } from 'react';
import EntrySectionType from '../../model/types/EntrySection';
import { FreeText, FreeTextType, FreeTextData } from '../../model/FreeText';
import {
  CatalyticActivity,
  CatalyticActivityData,
} from '../../model/CatalyticActivity';
import { Keyword, KewyordsData } from '../../model/Keyword';
import { XRef, XrefData } from '../../model/XRef';
import FeaturesView, { FeatureData } from '../../model/FeaturesView';
import FeatureTypes from '../../model/types/featureTypes';

type data = FreeTextData &
  CatalyticActivityData &
  KewyordsData &
  FeatureData &
  XrefData;

const FunctionSection: FC<{ entryData: data }> = ({ entryData }) => (
  <Fragment>
    <FreeText data={entryData} type={FreeTextType.FUNCTION} />
    <CatalyticActivity data={entryData} />
    <FreeText
      data={entryData}
      type={FreeTextType.PATHWAY}
      includeTitle={true}
    />
    <Keyword data={entryData} section={EntrySectionType.Function} />
    <FeaturesView
      data={entryData}
      types={[
        FeatureTypes.DOMAIN,
        FeatureTypes.REPEAT,
        FeatureTypes.CA_BIND,
        FeatureTypes.ZN_FING,
        FeatureTypes.DNA_BIND,
        FeatureTypes.NP_BINDL,
        FeatureTypes.REGION,
        FeatureTypes.COILED,
        FeatureTypes.MOTIF,
        FeatureTypes.ACT_SITE,
        FeatureTypes.METAL,
        FeatureTypes.BINDING,
        FeatureTypes.SITE,
      ]}
    />
    <XRef data={entryData} section={EntrySectionType.Function} />
  </Fragment>
);

export default FunctionSection;
