import React, { Fragment } from 'react';
import { Card, ExpandableList, ExternalLink } from 'franklin-sites';
import { v1 } from 'uuid';
import { UniProtkbUIModel } from '../model/uniprotkb/UniProtkbConverter';
import XRefView from '../view/uniprotkb/components/XRefView';
import EntrySection from '../model/types/EntrySection';
import { XrefUIModel, XrefsGoupedByDatabase } from '../model/utils/XrefUtils';
import { CommentType, WebResourceComment } from '../model/types/CommentTypes';
import { groupBy } from '../utils/utils';
import { DatabaseCategory } from '../model/types/DatabaseTypes';

type EntryExternalLinksProps = {
  transformedData: UniProtkbUIModel;
};

export type EntryExternalLinks = {
  xrefData: XrefUIModel[];
};

type WebResourceLinkProps = {
  comment: WebResourceComment;
};

const WebResourceLink: React.FC<WebResourceLinkProps> = ({ comment }) => {
  const { note, resourceName, resourceUrl } = comment;
  const noteNode = note && ` (${note})`;
  return (
    <ExternalLink url={resourceUrl}>
      {resourceName}
      {noteNode}
    </ExternalLink>
  );
};

const EntryExternalLinks: React.FC<EntryExternalLinksProps> = ({
  transformedData,
}) => {
  const {
    [EntrySection.ExternalLinks]: data,
    primaryAccession,
    uniProtId,
  } = transformedData;
  const webResourceComments = data.commentsData.get(CommentType.WEB_RESOURCE);

  // Merge all of the external links from the entry page sections
  const databaseCategoryToXrefsGoupedByDatabase = new Map<
    DatabaseCategory,
    XrefsGoupedByDatabase[]
  >();
  Object.values(EntrySection).forEach(entrySection => {
    transformedData[entrySection as EntrySection].xrefData.forEach(
      ({ category, databases }) => {
        const currentDatabases = databaseCategoryToXrefsGoupedByDatabase.get(
          category
        );
        const newDatabases = currentDatabases
          ? [...currentDatabases, ...databases]
          : databases;
        databaseCategoryToXrefsGoupedByDatabase.set(category, newDatabases);
      }
    );
  });
  const xrefData = Array.from(
    databaseCategoryToXrefsGoupedByDatabase.entries()
  ).map(([category, xrefsGoupedByDatabase]) => ({
    category,
    databases: Array.from(
      groupBy(
        xrefsGoupedByDatabase,
        (xrefs: XrefsGoupedByDatabase) => xrefs.database
      ).values()
      // Only need the first entry as it assumed that each database
      // list is the same across all of the sections
    ).map(v => v[0]),
  }));

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
        <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default EntryExternalLinks;
