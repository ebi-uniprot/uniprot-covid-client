import React, { Fragment, FC } from 'react';
import EntrySectionType from '../../model/types/EntrySection';
import { FreeText, FreeTextType, FreeTextData } from '../../model/FreeText';
import {
  CatalyticActivity,
  CatalyticActivityData,
} from '../../model/CatalyticActivity';
import { Keyword } from '../../model/Keyword';
import { XRef, DatabaseCrossReference, XrefCategory } from '../../model/XRef';
import FeaturesView, { Feature } from '../../model/FeaturesView';
import FeatureTypes from '../../model/types/featureTypes';
import { getCategoryKeywords } from '../../model/utils/KeywordsUtil';
import KeywordCategory from '../../model/types/keywordTypes';
import { getCategoryXrefs } from '../../model/utils/XrefUtils';

type data = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData;
  keywords?: Keyword[];
  features?: Feature[];
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};
// &
// keywords?:
// KewyordsData

// &
// FeatureData &
// XrefData;

const getFunctionData = (data: data) => {
  let functionData: {
    functionCommentsData: FreeTextData;
    catalyticActivityData: CatalyticActivityData;
    pathwayCommentsData: FreeTextData;
    keywordData: { [keywordCategory: string]: Keyword[] };
    featuresData: Feature[];
    xrefData: XrefCategory[];
  } = {
    functionCommentsData: [],
    catalyticActivityData: [],
    pathwayCommentsData: [],
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  if (data.comments) {
    functionData.functionCommentsData = data.comments.filter(
      d => d.commentType === FreeTextType.FUNCTION
    );
    functionData.catalyticActivityData = data.comments.filter(
      d => d.commentType === FreeTextType.CATALYTIC_ACTIVITY
    );
    functionData.pathwayCommentsData = data.comments.filter(
      d => d.commentType === FreeTextType.PATHWAY
    );
  }
  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordCategory.MOLECULAR_FUNCTION,
      KeywordCategory.BIOLOGICAL_PROCESS,
      KeywordCategory.LIGAND,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      functionData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [
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
      ].includes(feature.type);
    });
    functionData.featuresData = features;
  }
  if (data.databaseCrossReferences) {
    const xrefs = getCategoryXrefs(
      data.databaseCrossReferences,
      EntrySectionType.Function
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      functionData.xrefData = xrefs;
    }
  }
  return functionData;
};

const FunctionSection: FC<{ entryData: data }> = ({ entryData }) => {
  const functionData = getFunctionData(entryData);
  return (
    <Fragment>
      <FreeText data={functionData.functionCommentsData} />
      <CatalyticActivity comments={functionData.catalyticActivityData} />
      <FreeText data={functionData.pathwayCommentsData} includeTitle={true} />
      <Keyword keywords={functionData.keywordData} />
      <FeaturesView
        features={functionData.featuresData}
        sequence={entryData.sequence}
      />
      <XRef
        xrefs={functionData.xrefData}
        primaryAccession={entryData.primaryAccession}
      />
    </Fragment>
  );
};

export default FunctionSection;
