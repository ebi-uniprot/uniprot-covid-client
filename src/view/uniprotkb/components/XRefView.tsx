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
  DatabaseInfoPoint,
  AttributesItem,
} from '../../../model/types/DatabaseTypes';
import { sortBy } from '../../../utils/utils';
import {
  transfromProperties,
  getPropertyValue,
} from '../../../model/utils/utils';

export const processUrlTemplate = (
  urlTemplate: string,
  params: { [key: string]: string }
) => {
  let url = urlTemplate;
  Object.entries(params).forEach(([param, value]) => {
    url = url.replace(new RegExp(`%${param}`, 'g'), value);
  });
  return url;
};

export const getDatabaseInfoAttribute = (
  attributes: AttributesItem[],
  name: string
) => attributes.find(({ name: n }) => n === name);

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
  const { attributes } = databaseInfo;
  if (!attributes) {
    return null;
  }
  const attribute = getDatabaseInfoAttribute(attributes, property);
  const { properties } = xref;
  if (!properties) {
    return null;
  }
  const id = getPropertyValue(properties, property);
  if (!id || !attribute || !attribute.uriLink) {
    return null;
  }
  const url = processUrlTemplate(attribute.uriLink, { [property]: id });
  return (
    <ExternalLink key={url} url={url}>
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
}): JSX.Element | null => {
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

  const params: { [key: string]: string } = {
    primaryAccession,
    ...transfromProperties(properties),
  };
  if (id) {
    params.id = id;
  }
  if (crc64) {
    params.crc64 = crc64;
  }

  let linkNode;
  if (database === 'EMBL') {
    // M28638 (EMBL|GenBank|DDBJ)
    const genBankInfo = databaseToDatabaseInfo.GenBank;
    const ddbjInfo = databaseToDatabaseInfo.DDBJ;
    if (!genBankInfo || !ddbjInfo) {
      // eslint-disable-next-line no-console
      console.warn(
        'GenBank or DDBJ database information not found in drlineconiguration'
      );
    }
    linkNode = (
      <Fragment>
        (
        <ExternalLink url={processUrlTemplate(databaseInfo.uriLink, params)}>
          EMBL
        </ExternalLink>
        {' | '}
        <ExternalLink url={processUrlTemplate(genBankInfo.uriLink, params)}>
          GenBank
        </ExternalLink>
        {' | '}
        <ExternalLink url={processUrlTemplate(ddbjInfo.uriLink, params)}>
          DDBJ
        </ExternalLink>
        ) {id}
      </Fragment>
    );
  } else {
    let text;
    if (implicit) {
      text =
        databaseType === 'SWISS-MODEL-Workspace'
          ? 'Submit a new modelling project...'
          : 'Search...';
    } else {
      text = id;
    }
    linkNode = (
      <ExternalLink url={processUrlTemplate(uriLink, params)}>
        {text}
      </ExternalLink>
    );
  }
  return (
    <Fragment>
      {linkNode} {propertiesNode} {isoformNode}
    </Fragment>
  );
};

export const DatabaseList: React.FC<{
  xrefsGoupedByDatabase: XrefsGoupedByDatabase;
  primaryAccession: string;
  crc64?: string;
}> = ({
  xrefsGoupedByDatabase: { database, xrefs },
  primaryAccession,
  crc64,
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
        />
      );
      let title;
      if (category && databaseCategoryToString[category]) {
        title = databaseCategoryToString[category];
      }
      return (
        <Fragment key={v1()}>
          <h3>{title}</h3>
          {infoListNode}
        </Fragment>
      );
    }
  );
  return <Fragment>{nodes}</Fragment>;
};

export default XRefView;
