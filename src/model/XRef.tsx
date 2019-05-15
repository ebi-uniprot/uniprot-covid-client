import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList, ExternalLink } from 'franklin-sites';
import databaseToDatabaseInfoJson from '../data/databaseToDatabaseInfo.json';
import {
  Database,
  DatabaseCategory,
  DatabaseToDatabaseInfo,
} from '../model/types/databaseTypes';

type Property = {
  key?: string;
  value?: string;
};

export type DatabaseCrossReference = {
  databaseType?: Database;
  id?: string;
  properties?: [Property];
  isoformId?: string;
};

export type DatabaseXrefs = {
  database: Database;
  xrefs: DatabaseCrossReference[];
};

export type XrefCategory = {
  category: DatabaseCategory;
  databases: DatabaseXrefs[];
};

export type XrefItem = {
  databaseCategory: string;
  xref: DatabaseCrossReference;
};

type XRefProps = {
  xrefs: XrefCategory[];
  primaryAccession: string;
};

type XRefItemProps = {
  xRefEntry: DatabaseCrossReference;
  primaryAccession: string;
};

type XRefCategoryInfoListProps = {
  databases: DatabaseXrefs[];
  primaryAccession: string;
};

const databaseToDatabaseInfo: DatabaseToDatabaseInfo = databaseToDatabaseInfoJson;

export const XRefItem: React.FC<XRefItemProps> = ({
  xRefEntry,
  primaryAccession,
}) => {
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
  const uri = info.uriLink
    .replace(/%acc/g, primaryAccession)
    .replace(/%value/g, id);
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
      <ExternalLink url={uri}>{xRefEntry.id}</ExternalLink>
      {properties}
    </li>
  );
};

export const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
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

export const XRef: React.FC<XRefProps> = ({ xrefs, primaryAccession }) => {
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

export default XRef;
