import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../utils/utils';
import EntrySection from '../../types/EntrySection';
import FreeTextView from './FreeTextView';
import KeywordView from './KeywordView';
import XRefView from './XRefView';
import { UIModel } from '../../adapters/SectionConverter';
import { CommentType, FreeTextComment } from '../../types/CommentTypes';

const ExpressionSection: FC<{
  data: UIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Expression}>
      <Card title={EntrySection.Expression}>
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.TISSUE_SPECIFICITY
            ) as FreeTextComment[]
          }
          title={CommentType.TISSUE_SPECIFICITY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.INDUCTION) as FreeTextComment[]
          }
          title={CommentType.INDUCTION.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.DEVELOPMENTAL_STAGE
            ) as FreeTextComment[]
          }
          title={CommentType.DEVELOPMENTAL_STAGE.toLowerCase()}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ExpressionSection;
