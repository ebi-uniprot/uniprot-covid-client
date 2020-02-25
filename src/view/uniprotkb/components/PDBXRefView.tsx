import React, { Fragment, useCallback, useState, FC } from 'react';
import ProtvistaDatatable from 'protvista-datatable';
import { loadWebComponent } from '../../../utils/utils';
import { AttributesItem } from '../../../model/types/DatabaseTypes';
import { getPropertyValue } from '../../../model/utils/utils';
import { TemplateResult, html } from 'lit-html';
import { databaseToDatabaseInfo } from '../../../data/database';

loadWebComponent('protvista-datatable', ProtvistaDatatable);
const PDBMirrorInfo = [
  databaseToDatabaseInfo['PDBe-KB'],
  databaseToDatabaseInfo['RCSB-PDB'],
  databaseToDatabaseInfo['PDBj'],
  databaseToDatabaseInfo['PDBsum'],
];
console.log(PDBMirrorInfo);
const processData = databases => {
  const PDBDatabase = databases.filter(({ database }) => database === 'PDB');
  if (!PDBDatabase || PDBDatabase.length !== 1) {
    return;
  }
  const { xrefs } = PDBDatabase[0];
  return xrefs.map(({ id, properties }) => {
    const chains = getPropertyValue(properties, 'Chains');
    let chain;
    let positions;
    if (chains) {
      const tokens = chains.split('=');
      if (tokens.length === 2) {
        chain = tokens[0];
        positions = tokens[1];
      }
    }
    const resolution = getPropertyValue(properties, 'Resolution');
    return {
      id,
      method: getPropertyValue(properties, 'Method'),
      resolution: !resolution || resolution === '-' ? null : resolution,
      chain,
      positions,
    };
  });
};

const getColumnConfig = () => ({
  type: {
    label: 'PDB Entry',
    resolver: (d): string => d.id,
  },
  method: {
    label: 'Method',
    resolver: (d): string => d.method,
  },
  resolution: {
    label: 'Resolution',
    resolver: (d): string => d.resolution,
  },
  chain: {
    label: 'Chain',
    resolver: (d): string => d.chain,
  },
  positions: {
    label: 'Positions',
    resolver: (d): string => d.positions,
  },
  links: {
    label: 'Links',
    resolver: (d): TemplateResult =>
      html`
        ${PDBMirrorInfo.map(
          ({ displayName, uriLink }) =>
            html`
              <a href="#">${displayName}</a>
            `
        ).reduce(
          (prev, curr) =>
            html`
              ${prev} · ${curr}
            `
        )}
      `,
  },
});

const PDBXRefView = ({ databases }) => {
  console.log(databases);
  const data = processData(databases);
  console.log(data);
  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = getColumnConfig();
      }
    },
    [databases]
  );
  return <protvista-datatable ref={setTableData} />;
};

export default PDBXRefView;
