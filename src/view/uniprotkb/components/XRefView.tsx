import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList, ExternalLink } from 'franklin-sites';
import databaseToDatabaseInfoJson from '../../../data/databaseToDatabaseInfo.json';
import { DatabaseToDatabaseInfo } from '../../../model/types/DatabaseTypes';
import {
  XrefUIModel,
  Xref,
  XrefsGoupedByDatabase,
} from '../../../model/utils/XrefUtils.js';
import { Property } from '../../../model/types/modelTypes.js';

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

const databaseToDatabaseInfo: DatabaseToDatabaseInfo = databaseToDatabaseInfoJson;

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
}) => {
  let link = url;
  if (accession) {
    link = link.replace(/%acc/g, accession);
  }
  if (id) {
    link = link.replace(/%value/g, id);
  }
  return <ExternalLink url={link}>{children}</ExternalLink>;
};

const XRefItem: React.FC<XRefItemProps> = ({ xRefEntry, primaryAccession }) => {
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
  let properties: string = '';
  if (entryProperties) {
    properties = entryProperties
      .map((property: Property) =>
        property.value && property.value === '-' ? '' : property.value
      )
      .join(' ');
  }
  return (
    <li key={v1()}>
      <XRefExternalLink url={info.uriLink} accession={primaryAccession} id={id}>
        {id}
      </XRefExternalLink>
      {properties}
    </li>
  );
};

const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
  databases,
  primaryAccession,
}) => {
  const infoData = databases.sort().map(database => ({
    title: database.database,
    content: (
      <ul className="no-bullet">
        {database.xrefs.map(xref => (
          <XRefItem
            xRefEntry={xref}
            primaryAccession={primaryAccession}
            key={v1()}
          />
        ))}
      </ul>
    ),
  }));
  return <InfoList infoData={infoData} />;
};

const XRefView: React.FC<XRefProps> = ({ xrefs, primaryAccession }) => {
  if (!xrefs) {
    return null;
  }
  const nodes = xrefs.map(xrefCategory => {
    const infoListNode = (
      <XRefCategoryInfoList
        databases={xrefCategory.databases}
        primaryAccession={primaryAccession}
      />
    );
    return (
      <Fragment key={v1()}>
        {xrefCategory.category && <h4>{xrefCategory.category}</h4>}
        {infoListNode}
      </Fragment>
    );
  });
  return <Fragment>{nodes}</Fragment>;
};

export default XRefView;
