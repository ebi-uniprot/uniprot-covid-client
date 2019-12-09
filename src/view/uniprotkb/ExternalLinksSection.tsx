import React, { FC, Fragment } from 'react';
import { Card, ExpandableList } from 'franklin-sites';
import FreeTextView from './components/FreeTextView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { XrefUIModel } from '../../model/utils/XrefUtils';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import { CommentType, FreeTextComment } from '../../model/types/CommentTypes';
import { v1 } from 'uuid';

export type ExternalLinks = {
  xrefData: XrefUIModel[];
};

const WebResourceLink = ({ note, resourceName, resourceUrl }) => {
  const noteNode = note && ` (${note})`;
  return (
    <a href={resourceUrl}>
      {resourceName}
      {noteNode}
    </a>
  );
};

const ExternalLinksSection: FC<{
  data: UIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  console.log(data.commentsData.get(CommentType.WEBRESOURCE));
  return (
    <div id={EntrySection.ExternalLinks}>
      <Card title={EntrySection.ExternalLinks}>
        <h4>Web resources</h4>
        <ExpandableList descriptionString="alternative names">
          {data.commentsData
            .get(CommentType.WEBRESOURCE)
            .map(({ note, resourceName, resourceUrl }) => ({
              id: v1(),
              content: (
                <WebResourceLink
                  note={note}
                  resourceName={resourceName}
                  resourceUrl={resourceUrl}
                />
              ),
            }))}
        </ExpandableList>
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ExternalLinksSection;
