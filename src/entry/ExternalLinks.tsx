import React, { Fragment, memo } from 'react';
import { Card, ExpandableList } from 'franklin-sites';
import { RouteComponentProps, withRouter } from 'react-router';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import { UniProtkbUIModel } from '../model/uniprotkb/UniProtkbConverter';
import XRefView from '../view/uniprotkb/components/XRefView';
import EntrySection from '../model/types/EntrySection';
import { hasContent } from '../model/utils/utils';
import { XrefUIModel } from '../model/utils/XrefUtils';
import { CommentType, WebResourceComment } from '../model/types/CommentTypes';
import { v1 } from 'uuid';

type ExternalLinksProps = {
  transformedData: UniProtkbUIModel;
} & RouteComponentProps;

export type ExternalLinks = {
  xrefData: XrefUIModel[];
};

type WebResourceLinkProps = {
  comment: WebResourceComment;
};

const WebResourceLink: React.FC<WebResourceLinkProps> = ({ comment }) => {
  const { note, resourceName, resourceUrl } = comment;
  const noteNode = note && ` (${note})`;
  return (
    <a href={resourceUrl}>
      {resourceName}
      {noteNode}
    </a>
  );
};

const ExternalLinks: React.FC<ExternalLinksProps> = ({ transformedData }) => {
  const {
    [EntrySection.ExternalLinks]: data,
    primaryAccession,
  } = transformedData;
  if (!hasContent(data)) {
    return null;
  }

  const webResourceComments = data.commentsData.get(CommentType.WEB_RESOURCE);

  return (
    <div id={EntrySection.ExternalLinks}>
      <Card title={EntrySection.ExternalLinks}>
        {webResourceComments && (
          <Fragment>
            <h4>Web resources</h4>
            <ExpandableList descriptionString="alternative names">
              {webResourceComments.map(comment => ({
                id: v1(),
                content: (
                  <WebResourceLink comment={comment as WebResourceComment} />
                ),
              }))}
            </ExpandableList>
          </Fragment>
        )}
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default withRouter(ExternalLinks);
