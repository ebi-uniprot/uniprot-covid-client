/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, Fragment } from 'react';
import idx from 'idx';
import { UniProtkbAPIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import { getKeywordsForCategories } from '../../../model/utils/KeywordsUtil';
import { truncateStringWithEllipsis } from '../../../utils/utils';
import KeywordCategory from '../../../model/types/KeywordCategory';
import convertGeneNames from '../../../model/uniprotkb/GeneNamesConverter';
import { GeneNamesViewFlat } from './GeneNamesView';
import { KeywordList } from './KeywordView';
import UniProtTitle from './UniProtTitle';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from './AnnotationScoreDoughnutChart';
import Comment from '../../../model/types/Comment';

const CHAR_LENGTH_FUNCTION_SUMMARY = 150;

const UniProtCard: FC<{
  data: UniProtkbAPIModel;
}> = ({ data }): JSX.Element => {
  let recommendedNameNode;
  const recommendedName = idx(
    data,
    (_): string => _.proteinDescription.recommendedName.fullName.value
  );
  if (recommendedName) {
    recommendedNameNode = `${recommendedName} · `;
  }

  const organismNameNode = (
    <Fragment>
      <a href="#">{idx(data, (_): string => _.organism.scientificName)}</a>
      {' · '}
    </Fragment>
  );

  let geneNameListNode;
  if (data.genes) {
    const convertedGeneNames = convertGeneNames(data.genes);
    geneNameListNode = `Gene: ${GeneNamesViewFlat(convertedGeneNames)} · `;
  }

  const sequenceLengthNode = `${data.sequence.length} amino-acids · `;

  const { annotationScore } = data;
  const annotationScoreNode = (
    <AnnotationScoreDoughnutChart size={DoughnutChartSize.small}>
      {annotationScore}
    </AnnotationScoreDoughnutChart>
  );

  let keywordsNode;
  if (data.keywords) {
    const categorisedKewywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.MOLECULAR_FUNCTION,
      KeywordCategory.BIOLOGICAL_PROCESS,
      KeywordCategory.DISEASE,
    ]);

    if (categorisedKewywords.length > 0) {
      keywordsNode = categorisedKewywords.map((keywordCategory, index) => (
        <Fragment key={keywordCategory.category}>
          {index > 0 && ' · '}
          <KeywordList keywords={keywordCategory.keywords} />
        </Fragment>
      ));
    }
  }

  let functionNode;
  const firstCommentType = idx(data, (_): string => _.comments[0].commentType);
  if (firstCommentType === Comment.FUNCTION) {
    const firstCommentValue = idx(
      data,
      (_): string => _.comments[0].texts[0].value
    );
    if (firstCommentValue) {
      functionNode = truncateStringWithEllipsis(
        firstCommentValue,
        CHAR_LENGTH_FUNCTION_SUMMARY
      );
    }
  }

  return (
    <div>
      <h4>
        <UniProtTitle
          primaryAccession={data.primaryAccession}
          entryType={data.entryType}
          uniProtId={data.uniProtId}
        />
      </h4>
      <p>
        {recommendedNameNode}
        {organismNameNode}
        {geneNameListNode}
        {sequenceLengthNode}
        {annotationScoreNode}
      </p>
      <p>{functionNode}</p>
      <p>{keywordsNode}</p>
    </div>
  );
};

export default UniProtCard;
