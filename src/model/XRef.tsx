import React, { Fragment } from 'react';
import v1 from 'uuid';
import idx from 'idx';
import { InfoList } from 'franklin-sites';
import pageSectionToDatabaseCategories from '../data/pageSectionToDatabaseCategories.json';
import databaseCategoryToDatabases from '../data/databaseCategoryToDatabases.json';
import databaseCategoryToString from '../data/databaseCategoryToString.json';
import databaseToDatabaseInfo from '../data/databaseToDatabaseInfo.json';
import externalLink from '../images/external-link.png';
import '../styles/links.scss';

enum DatabaseCategory {
  SEQUENCE,
  STRUCTURE,
  INTERACTION,
  CHEMISTRY,
  FAMILY,
  PTM,
  POLYMORPHISM,
  GEL,
  PROTEOMIC,
  PROTOCOL,
  GENOME,
  ORGANISM,
  PHYLOGENOMIC,
  PATHWAY,
  EXPRESSION,
  DOMAIN,
  OTHER,
}

const pageSectionToDatabaseToDatabaseCategory = {};
for (let pageSection in pageSectionToDatabaseCategories) {
  const databaseToDatabaseCategory = {};
  for (let databaseCategory of pageSectionToDatabaseCategories[pageSection]) {
    for (let database of databaseCategoryToDatabases[databaseCategory]) {
      databaseToDatabaseCategory[database] = databaseCategory;
    }
  }
  pageSectionToDatabaseToDatabaseCategory[
    pageSection
  ] = databaseToDatabaseCategory;
}

export type XRefData = {
  databaseCrossReferences: [
    {
      databaseType: string;
      id: string;
      properties: [
        {
          key: string;
          value: string;
        }
      ];
      isoformId?: string;
    }
  ];
};

type XRefProps = {
  section: string;
  data: XRefData;
};

const XRefItem = ({ xRefEntry, accession }) => {
  console.log(xRefEntry);
  const info = databaseToDatabaseInfo[xRefEntry.databaseType];
  console.log(info);
  let uri = info.uriLink
    .replace(/%acc/g, accession)
    .replace(/%value/g, xRefEntry.id);
  let properties;
  if (xRefEntry.properties) {
    properties = xRefEntry.properties
      .map(property => (property.value === '-' ? '' : property.value))
      .join(' ');
  }
  return (
    <div class="external-link">
      <a target="_blank" href={uri}>
        {xRefEntry.id}
        <img src={externalLink} />
      </a>
      {properties}
    </div>
  );
};

const XRefList = ({ database, xRefData, accession }) => {
  const content = xRefData
    .filter(xRefDatum => xRefDatum.xref.databaseType === database)
    .map(xRefDatum => {
      const { xref } = xRefDatum;
      return (
        <ul key={v1()}>
          <XRefItem xRefEntry={xref} accession={accession} />
        </ul>
      );
    });
  console.log('content', content);
  console.log('database', database);
  const infoData = [{ title: database, content }];
  console.log('infoData', infoData);

  return <InfoList infoData={infoData} />;
};

const XRefCategoryTable = ({
  databaseCategory,
  databases,
  xRefData,
  accession,
}) => {
  console.log('databaseCategory', databaseCategory);
  console.log('databases', databases);
  console.log('xRefData', xRefData);
  return (
    <div>
      <hr />
      <h4>{databaseCategoryToString[databaseCategory]}</h4>
      {databases.sort().map(database => (
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

export const XRef: React.FC<XRefProps> = ({ data, section }) => {
  const { databaseCrossReferences, primaryAccession: accession } = data;
  if (!databaseCrossReferences || !accession) {
    return null;
  }

  // const dbIds = dbTypes.reduce(
  //   (dbIds, dbType) => [...dbIds, ...dbTypeToDbIds[dbType]],
  //   []
  // );
  // console.log(dbTypes);
  // console.log(dbIds);
  // console.log(databaseCrossReferences);
  const foundXrefData = [];
  const foundDatabaseCategoriesToDatabases = {};
  databaseCrossReferences.forEach(xref => {
    const { databaseType: database } = xref;
    if (!database) {
      return;
    }
    const databaseCategory = idx(
      pageSectionToDatabaseToDatabaseCategory,
      _ => _[section][database]
    );
    if (!databaseCategory) {
      return null;
    }
    foundDatabaseCategoriesToDatabases[databaseCategory] = {
      ...foundDatabaseCategoriesToDatabases[databaseCategory],
      [database]: true,
    };
    foundXrefData.push({ databaseCategory, xref });
  });
  console.log(foundXrefData);
  console.log(foundDatabaseCategoriesToDatabases);
  // console.log(Object.keys(foundDatabaseCategories));
  return Object.keys(foundDatabaseCategoriesToDatabases)
    .sort()
    .map(foundDatabaseCategory => {
      console.log(foundDatabaseCategory);
      const databases = Object.keys(
        foundDatabaseCategoriesToDatabases[foundDatabaseCategory]
      );
      return (
        <XRefCategoryTable
          key={v1()}
          databaseCategory={foundDatabaseCategory}
          databases={databases}
          xRefData={foundXrefData}
          accession={accession}
        />
      );

      // const xrefs = foundXrefs.filter(
      //   foundXref => foundXref.databaseCategory === foundDatabaseCategory
      // );
      // console.log(xrefs);
    });
  // const freeTextData = data.comments
  //   .filter(d => d.commentType === type)
  //   .map((item, i) => (
  //     <p key={`freetext_${i}_${type}`}>
  //       {item.texts.map((itemText, j) => {
  //         return (
  //           <Fragment key={`freetext_${i}_${type}_${j}`}>
  //             {itemText.value}
  //             {itemText.evidences &&
  //               itemText.evidences.map(evidence => (
  //                 <UniProtEvidenceTag evidence={evidence} key={v1()} />
  //               ))}
  //           </Fragment>
  //         );
  //       })}
  //     </p>
  //   ));

  // return <Fragment>hi {section}</Fragment>;
};
