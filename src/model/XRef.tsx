import React, { Fragment } from 'react';
import v1 from 'uuid';
import idx from 'idx';
import { InfoList, ExternalLink } from 'franklin-sites';
import entrySectionToDatabaseCategories from '../data/EntrySectionToDatabaseCategories';
import databaseCategoryToDatabases from '../data/DatabaseCategoryToDatabases';
import databaseCategoryToString from '../data/DatabaseCategoryToString';
import databaseToDatabaseInfoJson from '../data/databaseToDatabaseInfo.json';
import DatabaseToDatabaseInfo from '../data/DatabaseToDatabaseInfo';
import EntrySectionType from '../data/EntrySection';
import DatabaseCategory from '../data/DatabaseCategory';
import Database from '../data/Database';

type Property = {
  key: string;
  value: string;
};

type DatabaseCrossReference = {
  databaseType: string;
  id: string;
  properties: [Property];
  isoformId?: string;
};

type Data = {
  databaseCrossReferences: [DatabaseCrossReference];
  primaryAccession: string;
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
  database: string;
};

type XRefCategoryTableProps = {
  databaseCategory: DatabaseCategory;
  databases: Database[];
  xRefData: XrefData[];
  accession: string;
};

const databaseToDatabaseInfo: DatabaseToDatabaseInfo = databaseToDatabaseInfoJson;

// Combine multiple maps into single map for quick read access.
const entrySectionDatabaseToDatabaseCategory = new Map<
  string,
  DatabaseCategory
>();
for (const [
  entrySection,
  databaseCategories,
] of entrySectionToDatabaseCategories) {
  if (databaseCategories) {
    for (const databaseCategory of databaseCategories) {
      const databases = databaseCategoryToDatabases.get(databaseCategory);
      if (databases) {
        for (const database of databases) {
          entrySectionDatabaseToDatabaseCategory.set(
            `${entrySection}_${database}`,
            databaseCategory
          );
        }
      }
    }
  }
}

const XRefItem: React.FC<XRefItemProps> = ({ xRefEntry, accession }) => {
  const { databaseType, properties: entryProperties, id } = xRefEntry;
  if (
    !id ||
    !databaseType ||
    !accession ||
    !(databaseType in databaseToDatabaseInfo)
  ) {
    return null;
  }
  const info = databaseToDatabaseInfo[databaseType];
  let uri = info.uriLink.replace(/%acc/g, accession).replace(/%value/g, id);
  let properties: string = '';
  if (entryProperties) {
    properties = entryProperties
      .map((property: Property) =>
        property.value && property.value === '-' ? '' : property.value
      )
      .join(' ');
  }
  return (
    <Fragment>
      <ExternalLink url={uri}>{xRefEntry.id}</ExternalLink>
      {properties}
    </Fragment>
  );
};

const XRefList: React.FC<XRefListProps> = ({
  database,
  xRefData,
  accession,
}) => {
  const content = xRefData
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
        <ul key={v1()}>
          <XRefItem xRefEntry={xref} accession={accession} />
        </ul>
      );
    });
  const infoData = [{ title: database, content }];
  return <InfoList infoData={infoData} />;
};

const XRefCategoryTable: React.FC<XRefCategoryTableProps> = ({
  databaseCategory,
  databases,
  xRefData,
  accession,
}) => {
  const databaseCategoryString = databaseCategoryToString.get(databaseCategory);
  const title = databaseCategoryString && <h4>{databaseCategoryString}</h4>;
  return (
    <div>
      <hr />
      {title}
      {databases.sort().map((database: string) => (
        <XRefList
          key={v1()}
          database={database}
          xRefData={xRefData}
          accession={accession}
        />
      ))}
    </div>
  );
};

const XRef: React.FC<XRefProps> = ({ data, section }) => {
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
      return (
        <XRefCategoryTable
          key={v1()}
          databaseCategory={foundDatabaseCategory as DatabaseCategory}
          databases={databases}
          xRefData={foundXrefData}
          accession={accession}
        />
      );
    });
  return <Fragment>{nodes}</Fragment>;
};

export default XRef;
