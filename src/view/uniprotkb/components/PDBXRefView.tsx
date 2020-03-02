import React, { useCallback, FC } from 'react';
import ProtvistaDatatable from 'protvista-datatable';
import { TemplateResult, html } from 'lit-html';
import { loadWebComponent } from '../../../utils/utils';
import { PDBMirrorsInfo } from '../../../data/database';
import { processUrlTemplate } from './XRefView';
import { Xref } from '../../../model/types/CommentTypes';

loadWebComponent('protvista-datatable', ProtvistaDatatable);

const processData = (xrefs: Xref[]) =>
  xrefs.map(({ id, properties }) => {
    if (!properties) {
      return null;
    }
    const { Chains, Resolution, Method } = properties;
    let chain;
    let positions;
    if (Chains) {
      const tokens = Chains.split('=');
      if (tokens.length === 2) {
        [chain, positions] = tokens;
      }
    }
    return {
      id,
      method: Method,
      resolution: !Resolution || Resolution === '-' ? null : Resolution,
      chain,
      positions,
    };
  });

export type ProtvistaPDB = {
  id: string;
  method: string;
  resolution: string;
  positions: string;
  chain: string;
};

const getColumnConfig = () => ({
  type: {
    label: 'PDB Entry',
    resolver: ({ id }: ProtvistaPDB): string => id,
  },
  method: {
    label: 'Method',
    resolver: ({ method }: ProtvistaPDB): string => method,
  },
  resolution: {
    label: 'Resolution',
    resolver: ({ resolution }: ProtvistaPDB): string =>
      resolution && resolution.replace('A', 'Å'),
  },
  chain: {
    label: 'Chain',
    resolver: ({ chain }: ProtvistaPDB): string => chain,
  },
  positions: {
    label: 'Positions',
    resolver: ({ positions }: ProtvistaPDB): string => positions,
  },
  links: {
    label: 'Links',
    resolver: ({ id }: ProtvistaPDB): TemplateResult =>
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

const PDBXRefView: FC<{
  xrefs: Xref[];
}> = ({ xrefs }) => {
  const data = processData(xrefs);
  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = getColumnConfig();
      }
    },
    [data]
  );
  return <protvista-datatable ref={setTableData} />;
};

export default PDBXRefView;
