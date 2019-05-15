import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import idx from 'idx';
import { InfoList, ExternalLink } from 'franklin-sites';
import {
  entrySectionDatabaseToDatabaseCategory,
  databaseCategoryToString,
} from '../data/database';
import databaseToDatabaseInfoJson from '../data/databaseToDatabaseInfo.json';
import EntrySectionType from '../model/types/EntrySection';
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

type Data = {
  databaseCrossReferences?: [DatabaseCrossReference];
  primaryAccession?: string;
};

type XrefData = {
  databaseCategory: string;
  xref: DatabaseCrossReference;
};

type XRefProps = {
  section: EntrySectionType;
  data: Data;
};

type XRefItemProps = {
  xRefEntry: DatabaseCrossReference;
  accession: string;
};

type XRefListProps = {
  accession: string;
  xRefData: XrefData[];
  database: Database;
};

type XRefCategoryInfoListProps = {
  databases: Database[];
  xRefData: XrefData[];
  accession: string;
};

const databaseToDatabaseInfo: DatabaseToDatabaseInfo = databaseToDatabaseInfoJson;

type XRefExternalLinkProps = {
  url: string;
  accession?: string | null | undefined;
  id?: string | null | undefined;
  children: string;
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

export const XRefItem: React.FC<XRefItemProps> = ({ xRefEntry, accession }) => {
  const { databaseType: database, properties: entryProperties, id } = xRefEntry;
  if (!id || !database || !accession || !(database in databaseToDatabaseInfo)) {
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
      <XRefExternalLink url={info.uriLink} accession={accession} id={id}>
        {id}
      </XRefExternalLink>
      {properties}
    </li>
  );
};

export const XRefList: React.FC<XRefListProps> = ({
  database,
  xRefData,
  accession,
}) => {
  const nodes = xRefData
    .filter(
      (xRefDatum: XrefData) =>
        idx(xRefDatum, _ => _.xref.databaseType) === database
    )
    .map((xRefDatum: XrefData) => {
      const { xref } = xRefDatum;
      if (!xref) {
        return null;
      }
      return (
        <ul className="no-bullet" key={v1()}>
          <XRefItem xRefEntry={xref} accession={accession} />
        </ul>
      );
    });
  return <Fragment>{nodes}</Fragment>;
};

export const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
  databases,
  xRefData,
  accession,
}) => {
  const infoData = databases.sort().map(database => ({
    title: database,
    content: (
      <XRefList database={database} xRefData={xRefData} accession={accession} />
    ),
  }));

  if (infoData.length === 0) {
    return null;
  }
  return <InfoList infoData={infoData} />;
};

export const XRef: React.FC<XRefProps> = ({ data, section }) => {
  const { databaseCrossReferences, primaryAccession: accession } = data;
  if (!databaseCrossReferences || !accession) {
    return null;
  }
  const foundXrefData: XrefData[] = [];
  const foundDatabaseCategoriesToDatabases: {
    [databaseCategory: string]: { [database: string]: boolean };
  } = {};
  for (const xref of databaseCrossReferences) {
    const { databaseType: database } = xref;
    if (!database) {
      continue;
    }
    const databaseCategory = entrySectionDatabaseToDatabaseCategory.get(
      `${section}_${database}`
    );
    if (!databaseCategory) {
      continue;
    }
    foundDatabaseCategoriesToDatabases[databaseCategory] = {
      ...foundDatabaseCategoriesToDatabases[databaseCategory],
      [database]: true,
    };
    foundXrefData.push({ databaseCategory, xref });
  }
  const nodes = Object.keys(foundDatabaseCategoriesToDatabases)
    .sort()
    .map(foundDatabaseCategory => {
      const databases = Object.keys(
        foundDatabaseCategoriesToDatabases[foundDatabaseCategory]
      ) as Database[];
      const databaseCategoryString = databaseCategoryToString.get(
        foundDatabaseCategory as DatabaseCategory
      );
      const infoListNode = (
        <XRefCategoryInfoList
          databases={databases}
          xRefData={foundXrefData}
          accession={accession}
        />
      );
      if (!infoListNode) {
        return null;
      }
      return (
        <Fragment key={v1()}>
          {databaseCategoryString && <h4>{databaseCategoryString}</h4>}
          {infoListNode}
        </Fragment>
      );
    });
  return <Fragment>{nodes}</Fragment>;
};

export default XRef;
