/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProtvistaTrack from 'protvista-track';
import { BlastResults, BlastHsp, BlastHit } from '../types/blastResults';
import { loadWebComponent } from '../../../shared/utils/utils';

import './styles/BlastResultTable.scss';

const BlastResultsHsp: FC<{
  hsp: BlastHsp;
  length: number;
}> = ({ hsp, length }) => {
  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: hsp.hsp_query_from,
            end: hsp.hsp_query_to,
            // franklin $colour-sapphire-blue
            color: '#014371',
            opacity: hsp.hsp_identity / 100,
          },
        ];
      }
    },
    [hsp]
  );

  return (
    <section className="data-table__blast-hsp">
      {/* protvista-track height doesn't seem to be working properly */}
      <protvista-track length={length} height={44} ref={setTrackData} />
      {/* {`${hsp.hsp_hit_from}-${hsp.hsp_hit_to} bit-score:${hsp.hsp_bit_score}`} */}
    </section>
  );
};

const BlastResultTable: FC<{ data: BlastResults }> = ({ data }) => {
  if (!data) {
    return null;
  }
  loadWebComponent('protvista-track', ProtvistaTrack);

  return (
    <Fragment>
      <table className="data-table__table">
        <thead className="data-table__table__header">
          <tr className="data-table__table__header__row">
            <th className="data-table__table__header__row__cell">Accession</th>
            <th className="data-table__table__header__row__cell">Gene</th>
            <th className="data-table__table__header__row__cell">Organism</th>
            <th className="data-table__table__header__row__cell">Alignment</th>
          </tr>
        </thead>
        <tbody className="data-table__table__body">
          {data &&
            data.hits &&
            data.hits.map((hit: BlastHit) => {
              const {
                hit_acc,
                hit_hsps,
                hit_uni_gn,
                hit_uni_os,
                hit_uni_ox,
              } = hit;
              return (
                <tr key={hit_acc}>
                  <td className="data-table__table__body__cell">
                    <Link to={`/uniprotkb/${hit_acc}`}>{hit_acc}</Link>
                  </td>
                  <td className="data-table__table__body__cell">
                    {hit_uni_gn}
                  </td>
                  <td className="data-table__table__body__cell">
                    <Link to={`/taxonomy/${hit_uni_ox}`}>{hit_uni_os}</Link>
                  </td>
                  <td className="data-table__table__body__cell">
                    {hit_hsps.map((hsp) => (
                      <BlastResultsHsp
                        hsp={hsp}
                        length={data.query_len}
                        key={`${hsp.hsp_hit_from}-${hsp.hsp_hit_to}`}
                      />
                    ))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BlastResultTable;
