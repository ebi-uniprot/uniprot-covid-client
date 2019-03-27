import React, { Fragment } from 'react';
import v1 from 'uuid';
import idx from 'idx';
import { InfoList } from 'franklin-sites';
import pageSectionToDatabaseCategories from '../data/pageSectionToDatabaseCategories.json';
import databaseCategoryToDatabases from '../data/databaseCategoryToDatabases.json';
import databaseCategoryToString from '../data/databaseCategoryToString.json';
import databaseToDatabaseInfo from '../data/databaseToDatabaseInfo.json';

const pageSectionToDatabaseToDatabaseCategory = {};

Object.keys(pageSectionToDatabaseCategories).forEach(pageSection => {
  const databaseToDatabaseCategory = {};
  pageSectionToDatabaseCategories[pageSection].forEach(databaseCategory => {
    databaseCategoryToDatabases[databaseCategory].forEach(database => {
      databaseToDatabaseCategory[database] = databaseCategory;
    });
  });
  pageSectionToDatabaseToDatabaseCategory[
    pageSection
  ] = databaseToDatabaseCategory;
});

// Object.keys(pageSectionToDatabaseCategory).forEach(pageSection => {
//   const dbTypes = pageSectionToDbType[pageSection];
//   const t = {};
//   dbTypes.forEach(dbType => {
//     dbTypeToDbIds[dbType].forEach(dbId => {
//       t[dbId] = true;
//     });
//   });
//   pageSectionToDbIds[pageSection] = t;
// });

console.log(
  'pageSectionToDatabaseToDatabaseCategory',
  pageSectionToDatabaseToDatabaseCategory
);

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

  //www.reactome.org/PathwayBrowser/#%value&FLG=%acc
  // https: return xRefEntry.id;
  let properties;
  if (xRefEntry.properties) {
    properties = xRefEntry.properties
      .map(property => (property.value === '-' ? '' : property.value))
      .join(' ');
  }

  return (
    <div>
      <a href={uri}>{xRefEntry.id}</a> {properties}
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
      <h5>{databaseCategoryToString[databaseCategory]}</h5>
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
    if (databaseCategory) {
      foundDatabaseCategoriesToDatabases[databaseCategory] = {
        ...foundDatabaseCategoriesToDatabases[databaseCategory],
        [database]: true,
      };
      foundXrefData.push({ databaseCategory, xref });
    }
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
