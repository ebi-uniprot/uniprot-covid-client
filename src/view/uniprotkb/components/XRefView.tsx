import React, { Fragment, FC } from 'react';
import { v1 } from 'uuid';
import idx from 'idx';
import { sortBy } from 'lodash';
import { InfoList, ExternalLink, ExpandableList } from 'franklin-sites';
import {
  databaseCategoryToString,
  databaseToDatabaseInfo,
  viewProteinLinkDatabases,
} from '../../../data/database';
import {
  XrefUIModel,
  XrefsGoupedByDatabase,
  partitionStructureDatabases,
} from '../../../model/utils/XrefUtils';
import { Xref } from '../../../model/types/CommentTypes';
import { PropertyKey } from '../../../model/types/modelTypes';
import {
  DatabaseInfoPoint,
  AttributesItem,
  DatabaseCategory,
} from '../../../model/types/DatabaseRefs';
import PDBView from './PDBView';
import EMBLXrefProperties from '../../../data/EMBLXrefProperties.json';
import externalUrls from '../../../utils/externalUrls';

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

const formatSuffixWithCount = (prefix: string, number: string) => {
  const count = parseInt(number, 10);
  if (count <= 0) {
    return '';
  }
  return ` ${count} ${prefix}${count > 1 ? 's' : ''}`;
};

export const getPropertyString = (key?: string, value?: string) => {
  if (!value || value === '-') {
    return '';
  }
  if (key === PropertyKey.MatchStatus) {
    return formatSuffixWithCount('hit', value);
  }
  if (key === PropertyKey.Interactions) {
    return formatSuffixWithCount('interactor', value);
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
  const id = properties[property];
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
  taxonId?: number;
};

const EMBLXref: FC<{
  databaseInfo: DatabaseInfoPoint;
  params: { [key: string]: string };
  id: string | undefined;
  xref: Xref;
  isoformNode?: JSX.Element;
}> = ({ databaseInfo, params, id, xref, isoformNode }) => {
  // M28638 (EMBL|GenBank|DDBJ)
  const genBankInfo = databaseToDatabaseInfo.GenBank;
  const ddbjInfo = databaseToDatabaseInfo.DDBJ;
  const { properties, additionalIds } = xref;
  if (!genBankInfo || !ddbjInfo) {
    // eslint-disable-next-line no-console
    console.warn(
      'GenBank or DDBJ database information not found in drlineconiguration'
    );
  }
  return (
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
      {') '}
      {id && <ExternalLink url={externalUrls.ENA(id)}>{id}</ExternalLink>}
      {additionalIds &&
        additionalIds.map(additionalId => (
          <ExternalLink url={externalUrls.ENA(additionalId)} key={additionalId}>
            {additionalId}
          </ExternalLink>
        ))}
      {properties &&
        properties.MoleculeType &&
        `${
          EMBLXrefProperties[
            properties.MoleculeType as keyof typeof EMBLXrefProperties
          ]
        }: `}
      {properties &&
        properties.ProteinId &&
        properties.ProteinId !== '-' &&
        getPropertyLink(databaseInfo, PropertyKey.ProteinId, xref)}
      {properties &&
        properties.Status &&
        EMBLXrefProperties[
          properties.Status as keyof typeof EMBLXrefProperties
        ]}
      {isoformNode}
    </Fragment>
  );
};

// This exists purely for the Covid-19 portal so that the implicit
// PDBe-KB link points at the their specific covid-19 data
const PDBeKBCovid19XRef: FC<{
  primaryAccession: string;
}> = ({ primaryAccession }) => (
  <ExternalLink
    url={`https://www.ebi.ac.uk/pdbe/pdbe-kb/covid19/${primaryAccession}`}
  >
    View all available PDBe data, including observed ligand binding sites and
    protein-protein interaction residues
  </ExternalLink>
);

export const XRef: FC<XRefProps> = ({
  database,
  xref,
  primaryAccession,
  crc64,
  taxonId,
}): JSX.Element | null => {
  const databaseInfo = databaseToDatabaseInfo[database];
  const { properties, isoformId, id, database: databaseType } = xref;
  const { uriLink, implicit } = databaseInfo;
  if (!database || !primaryAccession) {
    return null;
  }
  let propertiesNode;
  if (properties && !implicit) {
    propertiesNode = Object.keys(properties).map(key =>
      [PropertyKey.ProteinId, PropertyKey.GeneId].includes(key as PropertyKey)
        ? getPropertyLink(databaseInfo, key as PropertyKey, xref)
        : getPropertyString(key, properties[key])
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
    ...properties,
  };

  if (id) {
    params.id = id;
  }
  if (crc64) {
    params.crc64 = crc64;
  }

  if (database === 'EMBL') {
    return (
      <EMBLXref
        databaseInfo={databaseInfo}
        params={params}
        id={id}
        xref={xref}
        isoformNode={isoformNode}
      />
    );
  }

  // This is hard-coded to show within the Covid-19 portal as
  // PDBe have a special location if the entry is sars-cov-2
  if (database === 'PDBe-KB' && taxonId === 2697049) {
    return <PDBeKBCovid19XRef primaryAccession={primaryAccession} />;
  }

  let text;
  if (implicit) {
    text =
      databaseType === 'SWISS-MODEL-Workspace'
        ? 'Submit a new modelling project...'
        : 'Search...';
  } else {
    text = id;
  }

  return (
    <Fragment>
      <ExternalLink url={processUrlTemplate(uriLink, params)}>
        {text}
      </ExternalLink>{' '}
      {propertiesNode} {isoformNode}
    </Fragment>
  );
};

export const DatabaseList: FC<{
  xrefsGoupedByDatabase: XrefsGoupedByDatabase;
  primaryAccession: string;
  crc64?: string;
  taxonId?: number;
}> = ({
  xrefsGoupedByDatabase: { database, xrefs },
  primaryAccession,
  crc64,
  taxonId,
}) => {
  // This step is needed as some databases (eg InterPro) have an additional link:
  // "View protein in InterPro" at the top of the xref links.
  let viewItem;
  const viewLink = viewProteinLinkDatabases.get(database);
  if (viewLink) {
    viewItem = [
      {
        id: v1(),
        content: (
          <ExternalLink
            key={v1()}
            url={viewLink(primaryAccession)}
          >{`View protein in ${database}`}</ExternalLink>
        ),
      },
    ];
  }
  const xrefItems = xrefs.map((xref): { id: string; content: JSX.Element } => ({
    id: v1(),
    content: (
      <XRef
        database={database}
        xref={xref}
        primaryAccession={primaryAccession}
        crc64={crc64}
        taxonId={taxonId}
      />
    ),
  }));
  return (
    <ExpandableList descriptionString={`${database} links`}>
      {viewItem ? viewItem.concat(xrefItems) : xrefItems}
    </ExpandableList>
  );
};

type StructureXRefsGroupedByCategoryProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
  crc64?: string;
  taxonId?: number;
};

const StructureXRefsGroupedByCategory: FC<StructureXRefsGroupedByCategoryProps> = ({
  databases,
  primaryAccession,
  crc64,
  taxonId,
}): JSX.Element => {
  const { PDBDatabase, otherStructureDatabases } = partitionStructureDatabases(
    databases
  );
  let PDBViewNode;
  if (PDBDatabase && PDBDatabase.xrefs.length) {
    PDBViewNode = <PDBView xrefs={PDBDatabase.xrefs} noStructure />;
  }
  return (
    <Fragment>
      {PDBViewNode}
      {otherStructureDatabases && otherStructureDatabases.length && (
        <XRefsGroupedByCategory
          databases={otherStructureDatabases}
          primaryAccession={primaryAccession}
          crc64={crc64}
          taxonId={taxonId}
        />
      )}
    </Fragment>
  );
};

type XRefsGroupedByCategoryProps = {
  databases: XrefsGoupedByDatabase[];
  primaryAccession: string;
  crc64?: string;
  taxonId?: number;
};

const XRefsGroupedByCategory: FC<XRefsGroupedByCategoryProps> = ({
  databases,
  primaryAccession,
  crc64,
  taxonId,
}): JSX.Element => {
  const infoData = sortBy(databases, ({ database }) => [
    idx(databaseToDatabaseInfo, o => o[database].implicit),
    database,
  ]).map((database): {
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
          taxonId={taxonId}
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
  taxonId?: number;
};

const XRefView: FC<XRefViewProps> = ({
  xrefs,
  primaryAccession,
  crc64,
  taxonId,
}): JSX.Element | null => {
  if (!xrefs) {
    return null;
  }
  const nodes = xrefs.map(
    ({ databases, category }): JSX.Element => {
      const xrefsNode =
        category === DatabaseCategory.STRUCTURE ? (
          <StructureXRefsGroupedByCategory
            databases={databases}
            primaryAccession={primaryAccession}
            crc64={crc64}
            taxonId={taxonId}
          />
        ) : (
          <XRefsGroupedByCategory
            databases={databases}
            primaryAccession={primaryAccession}
            crc64={crc64}
            taxonId={taxonId}
          />
        );
      let title;
      if (category && databaseCategoryToString[category]) {
        title = databaseCategoryToString[category];
      }
      return (
        <Fragment key={v1()}>
          <h3>{title}</h3>
          {xrefsNode}
        </Fragment>
      );
    }
  );
  return <Fragment>{nodes}</Fragment>;
};

export default XRefView;
