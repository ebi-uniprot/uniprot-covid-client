/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useCallback } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaMSA from 'protvista-msa';
import ProtvistaManager from 'protvista-manager';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

const HSPDetailPanel: FC<{ hsp: BlastHsp }> = ({ hsp }) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_query_to,
    hsp_qseq,
    hsp_hit_from,
    hsp_hit_to,
    hsp_hseq,
  } = hsp;

  // TODO calculate actual length based on total match and query lengths
  const actualLength = hsp_align_len;

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        // TODO calculate actual start|end based on actualLength
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: hsp_query_from,
            end: hsp_query_to,
          },
        ];
      }
    },
    [hsp_query_from, hsp_query_to]
  );

  const setMatchTrackData = useCallback(
    (node): void => {
      if (node) {
        // TODO calculate actual start|end based on actualLength
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: hsp_hit_from,
            end: hsp_hit_to,
          },
        ];
      }
    },
    [hsp_hit_from, hsp_hit_to]
  );

  const setMSAData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            name: 'Query',
            sequence: hsp_qseq,
          },
          {
            name: 'Match',
            sequence: hsp_hseq,
          },
        ];
      }
    },
    [hsp_qseq, hsp_hseq]
  );

  return (
    <SlidingPanel position="bottom">
      <>
        {/* TODO close link */}
        <h4>Protein name - Organism</h4>
        {/* TODO row of buttons - Highlight properties - Show annotation - View toggle */}
        <section className="hsp-row">
          <protvista-manager attributes="displaystart displayend">
            <protvista-navigation length={hsp_align_len} />
            <protvista-msa ref={setMSAData} length={hsp_align_len} />
          </protvista-manager>
        </section>
        <section className="hsp-row">
          {/* 
          TODO listen to "highlight" event from block above and set on these 2 tracks,
          working as protvista-manager
          */}
          {/* Query track */}
          <protvista-track
            height="10"
            ref={setQueryTrackData}
            length={actualLength}
            layout="non-overlapping"
          />
          {/* Match track - to colour based on score, see BlastSummaryTrack in BlastResultTable */}
          <protvista-track
            height="10"
            ref={setMatchTrackData}
            length={actualLength}
            layout="non-overlapping"
          />
          {/* TODO add configured feature tracks here */}
        </section>
      </>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
