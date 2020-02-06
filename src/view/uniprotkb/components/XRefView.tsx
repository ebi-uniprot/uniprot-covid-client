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
import {
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../../../model/types/DatabaseTypes';
import idx from 'idx';
import { link } from 'fs';
import { url } from 'inspector';
import { sortBy } from '../../../utils/utils';

type XrefItem = {
  databaseCategory: string;
  xref: Xref;
};

/*
https://www.brenda-enzymes.org/enzyme.php?ecno=%s&UniProtAcc=%value&OrganismID=%d",

*/

const fillUrl = (urlTemplate, params) => {
  let url = urlTemplate.slice();
  Object.keys(params).forEach(param => {
    const value = params[param];
    url = url.replace(new RegExp(`%${param}`, 'g'), value);
  });
  return url;
};

const transfromProperties = properties => {
  const o = {};
  properties.forEach(({ key, value }) => (o[key] = value));
  return o;
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

export const getPropertyString = (key?: string, value?: string) => {
  if (!value || value === '-') {
    return '';
  }
  if (key === PropertyKey.MatchStatus) {
    const hits = parseInt(value, 10);
    if (hits <= 0) {
      return '';
    }
    return ` - ${value} hit${hits > 1 ? 's' : ''}`;
  }
  return value;
};

export const getPropertyLink = (
  databaseInfo: DatabaseInfoPoint,
  property: PropertyKey,
  xref: Xref
) => {
  const attributes = getDatabaseInfoAttribute(databaseInfo, property);
  const id = getXrefProperty(xref, property);
  return (
    <ExternalLink url={fillUrl(attributes.uriLink, { [property]: id })}>
      {id}
    </ExternalLink>
  );
};

type XRefProps = {
  database: string;
  xref: Xref;
  primaryAccession?: string;
  crc64?: string;
};

export const XRef: React.FC<XRefProps> = ({
  database,
  xref,
  primaryAccession,
  crc64,
  uniProtId,
}): JSX.Element => {
  const databaseInfo = databaseToDatabaseInfo[database];
  const { properties = [], isoformId, id, databaseType } = xref;
  const { uriLink, implicit } = databaseInfo;
  if (!database || !primaryAccession) {
    return null;
  }
  let propertiesNode;
  if (properties) {
    propertiesNode = properties.map(({ key, value }: Property) =>
      key && value && [PropertyKey.ProteinId, PropertyKey.GeneId].includes(key)
        ? getPropertyLink(databaseInfo, key, xref)
        : getPropertyString(key, value)
    );
  }

  let isoformNode;
  if (isoformId) {
    isoformNode = (
      <Fragment>
        [<a href={`#${isoformId}`}>{isoformId}</a>]
      </Fragment>
    );
  }
  const url = fillUrl(uriLink, {
    primaryAccession,
    id,
    crc64,
    ...transfromProperties(properties),
  });
  const linkNode = (
    <ExternalLink url={url}>
      {implicit
        ? databaseType === 'SWISS-MODEL-Workspace'
          ? 'Submit a new modelling project...'
          : 'Search...'
        : id}
    </ExternalLink>
  );

  return (
    <Fragment key={v1()}>
      {linkNode} {propertiesNode} {isoformNode}
    </Fragment>
  );
};
type XRefExternalLinkProps = {
  url: string;
  primaryAccession?: string | null | undefined;
  id?: string | null | undefined;
  children: string | string[];
};

export const DatabaseList: React.FC<{
  xrefsGoupedByDatabase: XrefsGoupedByDatabase;
  primaryAccession: string;
  crc64?: string;
}> = ({
  xrefsGoupedByDatabase: { database, xrefs },
  primaryAccession,
  crc64,
  uniProtId,
}) => (
  <ExpandableList descriptionString={`${database} links`}>
    {xrefs.map((xref): { id: string; content: JSX.Element } => ({
      id: v1(),
      content: (
        <XRef
          database={database}
          xref={xref}
          primaryAccession={primaryAccession}
          crc64={crc64}
          uniProtId={uniProtId}
        />
      ),
    }))}
  </ExpandableList>
);

type XRefCategoryInfoListProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
  crc64?: string;
};

const XRefCategoryInfoList: React.FC<XRefCategoryInfoListProps> = ({
  databases,
  primaryAccession,
  crc64,
  uniProtId,
}): JSX.Element => {
  const infoData = sortBy(databases, 'database').map((database): {
    title: string;
    content: JSX.Element;
  } => {
    const databaseInfo = databaseToDatabaseInfo[database.database];
    return {
      title: databaseInfo.displayName,
      content: (
        <DatabaseList
          xrefsGoupedByDatabase={database}
          primaryAccession={primaryAccession}
          crc64={crc64}
          uniProtId={uniProtId}
        />
      ),
    };
  });
  return <InfoList infoData={infoData} columns />;
};

type XRefViewProps = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
  crc64?: string;
};

const XRefView: React.FC<XRefViewProps> = ({
  xrefs,
  primaryAccession,
  crc64,
  uniProtId,
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
          crc64={crc64}
          uniProtId={uniProtId}
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
