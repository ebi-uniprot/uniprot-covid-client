import React, { Fragment, useCallback, useState, FC } from 'react';
import ProtvistaDatatable from 'protvista-datatable';
import { loadWebComponent } from '../../../utils/utils';
import { getPropertyValue } from '../../../model/utils/utils';
import { TemplateResult, html } from 'lit-html';
import { PDBMirrorsInfo, databaseToDatabaseInfo } from '../../../data/database';
import { processUrlTemplate } from './XRefView';

loadWebComponent('protvista-datatable', ProtvistaDatatable);

const processData = databases => {
  // We only need the information from the PDB xref entries
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
    resolver: ({ id }): string => id,
  },
  method: {
    label: 'Method',
    resolver: ({ method }): string => method,
  },
  resolution: {
    label: 'Resolution',
    resolver: ({ resolution }): string => resolution,
  },
  chain: {
    label: 'Chain',
    resolver: ({ chain }): string => chain,
  },
  positions: {
    label: 'Positions',
    resolver: ({ positions }): string => positions,
  },
  links: {
    label: 'Links',
    resolver: ({ id }): TemplateResult =>
      html`
        ${PDBMirrorsInfo.map(
          ({ displayName, uriLink }) =>
            html`
              <a href="${processUrlTemplate(uriLink, { id })}"
                >${displayName}</a
              >
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
  const data = processData(databases);
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
