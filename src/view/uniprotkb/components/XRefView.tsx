import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList, ExternalLink, ExpandableList } from 'franklin-sites';
import {
  databaseCategoryToString,
  databaseToDatabaseInfo,
} from '../../../data/database';
import {
  XrefUIModel,
  Xref,
  XrefsGoupedByDatabase,
} from '../../../model/utils/XrefUtils';
import { Property } from '../../../model/types/modelTypes';

type XRefProps = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
};

type XRefItemProps = {
  xRefEntry: Xref;
  primaryAccession: string;
};

type XRefCategoryInfoListProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
};

type XrefItem = {
  databaseCategory: string;
  xref: Xref;
};

type XRefExternalLinkProps = {
  url: string;
  accession?: string | null | undefined;
  id?: string | null | undefined;
  children: string | string[];
};

export const XRefExternalLink: React.FC<XRefExternalLinkProps> = ({
  url,
  accession,
  id,
  children,
}): JSX.Element=> {
  let link = url;
  if (accession) {
    link = link.replace(/%acc/g, accession);
  }
  if (id) {
    link = link.replace(/%value/g, id);
  }
  return <ExternalLink url={link}>{children}</ExternalLink>;
};

const XRefItem: React.FC<XRefItemProps> = ({ xRefEntry, primaryAccession }): JSX.Element | null=> {
  const { databaseType: database, properties: entryProperties, id } = xRefEntry;
  if (
    !id ||
    !database ||
    !primaryAccession ||
    !(database in databaseToDatabaseInfo)
  ) {
    return null;
  }
  const info = databaseToDatabaseInfo[database];
  let properties = '';
  if (entryProperties) {
    properties = entryProperties
      .map((property: Property): string =>
        !property.value || (property.value && property.value === '-') ? '' : property.value
      )
      .join(' ');
  }
  return (
    <Fragment>
      <XRefExternalLink url={info.uriLink} accession={primaryAccession} id={id}>
        {id}
      </XRefExternalLink>
      {properties}
    </Fragment>
  );
};

const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
  databases,
  primaryAccession,
}): JSX.Element => {
  const infoData = databases.sort().map((database): {title: string, content: JSX.Element} => ({
    title: database.database,
    content: (
      <ExpandableList descriptionString={`${database.database} links`}>
        {database.xrefs.map((xref): { id: string, content: JSX.Element} => ({
          id: v1(),
          content: (
            <XRefItem xRefEntry={xref} primaryAccession={primaryAccession} />
          ),
        }))}
      </ExpandableList>
    ),
  }));
  return <InfoList infoData={infoData} />;
};

const XRefView: React.FC<XRefProps> = ({ xrefs, primaryAccession }): JSX.Element | null => {
  if (!xrefs) {
    return null;
  }
  const nodes = xrefs.map((xrefCategory): JSX.Element => {
    const infoListNode = (
      <XRefCategoryInfoList
        databases={xrefCategory.databases}
        primaryAccession={primaryAccession}
      />
    );
    let title;
    const { category } = xrefCategory;
    if (category && databaseCategoryToString[category]) {
      title = databaseCategoryToString[category];
    }
    return (
      <Fragment key={v1()}>
        <h4>{title}</h4>
        {infoListNode}
      </Fragment>
    );
  });
  return <Fragment>{nodes}</Fragment>;
};

export default XRefView;
