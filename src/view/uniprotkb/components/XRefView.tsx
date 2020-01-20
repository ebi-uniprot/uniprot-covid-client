import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList, ExternalLink, ExpandableList } from 'franklin-sites';
import {
  databaseCategoryToString,
  databaseToDatabaseInfo,
} from '../../../data/database';
import {
  XrefUIModel,
  XrefsGoupedByDatabase,
} from '../../../model/utils/XrefUtils';
import { Xref } from '../../../model/types/CommentTypes';
import { Property, PropertyKey } from '../../../model/types/modelTypes';
import { DatabaseInfo } from '../../../model/types/DatabaseTypes';
import idx from 'idx';
import { link } from 'fs';
import { url } from 'inspector';
import { sortBy } from '../../../utils/utils';

type XRefItemProps = {
  xRefEntry: Xref;
  primaryAccession: string;
};

type XrefItem = {
  databaseCategory: string;
  xref: Xref;
};

type XRefExternalLink2Props = {
  database: string;
  xref: Xref;
  primaryAccession?: string | null | undefined;
};

/*
https://www.brenda-enzymes.org/enzyme.php?ecno=%s&UniProtAcc=%value&OrganismID=%d",

*/

// const fillUrl = (urlTemplate, params) => {
//   params.reduce((accum, { param, value }) =>
//     accum.replace(new RegExp(param, value))
//   ),
//     urlTemplate;
// };

const fillUrl = (urlTemplate, params) => {
  let url = urlTemplate.slice();
  Object.keys(params).forEach(param => {
    const value = params[param];
    url = url.replace(new RegExp(`%${param}`, 'g'), value);
  });
  return url;
};

const getDatabaseInfoAttribute = (databaseInfoPoint, name) => {
  return databaseInfoPoint.attributes.find(({ name: n }) => n === name);
};

const getXrefProperty = (xref, name) => {
  const found = xref.properties.find(({ key }) => key === name);
  if (found) {
    return found.value;
  }
};

const EnsemblXRef = ({ databaseInfo, xref }) => {
  const geneId = getXrefProperty(xref, 'GeneId');
  const proteinId = getXrefProperty(xref, 'ProteinId');
  const proteinAttributes = getDatabaseInfoAttribute(databaseInfo, 'ProteinId');
  const geneAttributes = getDatabaseInfoAttribute(databaseInfo, 'GeneId');
  const { id, isoformId } = xref;
  if (!geneId || !proteinId || !proteinAttributes || !geneAttributes || !id) {
    return;
  }
  let isoformLink;
  if (isoformId) {
    isoformLink = (
      <Fragment>
        [<a href={`#${isoformId}`}>{isoformId}</a>]
      </Fragment>
    );
  }
  return (
    <Fragment>
      <ExternalLink url={fillUrl(databaseInfo.uriLink, { id })}>
        {id}
      </ExternalLink>{' '}
      <ExternalLink url={fillUrl(proteinAttributes.uriLink, { proteinId })}>
        {proteinId}
      </ExternalLink>{' '}
      <ExternalLink url={fillUrl(geneAttributes.uriLink, { geneId })}>
        {geneId}
      </ExternalLink>{' '}
      {isoformLink}
    </Fragment>
  );
};

export const getPropertyString = (property: Property) => {
  const { key, value } = property;
  if (!value || value === '-') {
    return '';
  }
  if (key === PropertyKey.MatchStatus) {
    const hits = parseInt(value, 10);
    if (hits <= 0) {
      return '';
    }
    return `- ${value} hit${hits > 1 ? 's' : ''}`;
  }
  return `${value}`;
};

const DefaultXRef: React.FC<XRefItemProps> = ({
  databaseInfo,
  xref,
  primaryAccession,
}) => {
  const {
    databaseType: database,
    properties: entryProperties,
    isoformId,
    id,
  } = xref;
  const { uriLink } = databaseInfo;
  if (!id || !database || !primaryAccession) {
    return null;
  }
  let properties = '';
  if (entryProperties) {
    properties = entryProperties
      .map((property: Property) => getPropertyString(property))
      .join(' ');
  }
  let isoformLink;
  if (isoformId) {
    isoformLink = (
      <Fragment>
        [<a href={`#${isoformId}`}>{isoformId}</a>]
      </Fragment>
    );
  }

  const url = fillUrl(uriLink, { accession: primaryAccession, id });

  return (
    <Fragment>
      <ExternalLink url={url} accession={primaryAccession} id={id}>
        {id}
      </ExternalLink>{' '}
      {properties} {isoformLink}
    </Fragment>
  );
};

export const XRef: React.FC<XRefExternalLink2Props> = ({
  database,
  xref,
  primaryAccession,
}): JSX.Element => {
  const databaseInfo = databaseToDatabaseInfo[database];
  switch (database) {
    case 'Ensembl':
      return (
        <EnsemblXRef
          databaseInfo={databaseInfo}
          xref={xref}
          primaryAccession={primaryAccession}
        />
      );
    default:
      return (
        <DefaultXRef
          databaseInfo={databaseInfo}
          xref={xref}
          primaryAccession={primaryAccession}
        />
      );
  }
};
type XRefExternalLinkProps = {
  url: string;
  primaryAccession?: string | null | undefined;
  id?: string | null | undefined;
  children: string | string[];
};

// export const XRefExternalLink: React.FC<XRefExternalLinkProps> = ({
//   url,
//   primaryAccession,
//   id,
//   children,
// }): JSX.Element => {
//   let link = url;
//   if (primaryAccession) {
//     link = link.replace(/%acc/g, primaryAccession);
//   }
//   if (id) {
//     link = link.replace(/%value/g, id);
//   }
//   return <ExternalLink url={link}>{children}</ExternalLink>;
// };

export const DatabaseList: React.FC<{
  xrefsGoupedByDatabase: XrefsGoupedByDatabase;
  primaryAccession: string;
}> = ({ xrefsGoupedByDatabase: { database, xrefs }, primaryAccession }) => (
  <ExpandableList descriptionString={`${database} links`}>
    {xrefs.map((xref): { id: string; content: JSX.Element } => ({
      id: v1(),
      content: (
        <XRef
          database={database}
          xref={xref}
          primaryAccession={primaryAccession}
        />
      ),
    }))}
  </ExpandableList>
);

type XRefCategoryInfoListProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
};

const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
  databases,
  primaryAccession,
}): JSX.Element => {
  const infoData = sortBy(databases, 'database').map((database): {
    title: string;
    content: JSX.Element;
  } => ({
    title: database.database,
    content: (
      <DatabaseList
        xrefsGoupedByDatabase={database}
        primaryAccession={primaryAccession}
      />
    ),
  }));
  return <InfoList infoData={infoData} columns />;
};

type XRefViewProps = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
};

const XRefView: React.FC<XRefViewProps> = ({
  xrefs,
  primaryAccession,
}): JSX.Element | null => {
  if (!xrefs) {
    return null;
  }
  const nodes = xrefs.map(
    ({ databases, category }): JSX.Element => {
      const infoListNode = (
        <XRefCategoryInfoList
          databases={databases}
          primaryAccession={primaryAccession}
        />
      );
      let title;
      if (category && databaseCategoryToString[category]) {
        title = databaseCategoryToString[category];
      }
      return (
        <Fragment key={v1()}>
          <h4>{title}</h4>
          {infoListNode}
        </Fragment>
      );
    }
  );
  return <Fragment>{nodes}</Fragment>;
};

export default XRefView;
