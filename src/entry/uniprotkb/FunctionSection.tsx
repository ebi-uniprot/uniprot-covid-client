import React, { Fragment, FC } from 'react';
import EntrySectionType from '../../model/types/EntrySection';
import { FreeText, FreeTextData } from '../../model/FreeText';
import {
  CatalyticActivity,
  CatalyticActivityData,
} from '../../model/CatalyticActivity';
import { Keyword, KeywordData, KeywordCategory } from '../../model/Keyword';
import { XRef, DatabaseCrossReference, XrefCategory } from '../../model/XRef';
import FeaturesView, { FeatureData } from '../../model/FeaturesView';
import FeatureTypes from '../../model/types/featureTypes';
import { getCategoryKeywords } from '../../model/utils/KeywordsUtil';
import KeywordTypes from '../../model/types/keywordTypes';
import { getCategoryXrefs } from '../../model/utils/XrefUtils';
import CommentType from '../../model/types/commentType';

type data = {
  primaryAccession: string;
  comments?: FreeTextData & CatalyticActivityData;
  keywords?: KeywordData;
  features?: FeatureData;
  databaseCrossReferences?: DatabaseCrossReference[];
  sequence: { value: string };
};

const getFunctionData = (data: data) => {
  let functionData: {
    functionCommentsData: FreeTextData;
    catalyticActivityData: CatalyticActivityData;
    pathwayCommentsData: FreeTextData;
    keywordData: KeywordCategory[];
    featuresData: FeatureData;
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
      d => d.commentType === CommentType.FUNCTION
    );
    functionData.catalyticActivityData = data.comments.filter(
      d => d.commentType === CommentType.CATALYTIC_ACTIVITY
    );
    functionData.pathwayCommentsData = data.comments.filter(
      d => d.commentType === CommentType.PATHWAY
    );
  }
  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.MOLECULAR_FUNCTION,
      KeywordTypes.BIOLOGICAL_PROCESS,
      KeywordTypes.LIGAND,
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
  if (
    functionData.functionCommentsData.length <= 0 &&
    functionData.catalyticActivityData.length <= 0 &&
    functionData.featuresData.length <= 0 &&
    functionData.keywordData.length <= 0 &&
    functionData.pathwayCommentsData.length <= 0 &&
    functionData.xrefData.length <= 0
  ) {
    return null;
  }
  return (
    <Fragment>
      <FreeText comments={functionData.functionCommentsData} />
      <CatalyticActivity comments={functionData.catalyticActivityData} />
      <FreeText
        comments={functionData.pathwayCommentsData}
        includeTitle={true}
      />
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
