/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useCallback, useEffect, useState } from 'react';
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

const HSPDetailPanel: FC<{ hsp: BlastHsp; hitLength: number }> = ({
  hsp,
  hitLength,
}) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_query_to,
    hsp_qseq,
    hsp_hit_from,
    hsp_hit_to,
    hsp_hseq,
    hsp_identity,
  } = hsp;
  // console.log("hsp:", hsp);
  // TODO calculate actual length based on total match and query lengths
  const actualLength = hsp_align_len;
  const [highlightPosition, setHighlighPosition] = useState('');

  // const regex = /([-]+)/gm;
  // let match = null;
  // const q_gaps = [];
  // const h_gaps = [];
  // const q_range = [];
  // const h_range = [];
  // const rangeMax = (hsp_hseq.length > hsp_qseq.length)
  //   ? hsp_hseq.length
  //   : hsp_qseq.length;

  // while ((match = regex.exec(hsp_qseq))) {
  //   const start = match.index;
  //   const end = match.index + match[0].length;

  //   q_gaps.push({ start, end });
  // }

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        // TODO calculate actual start|end based on actualLength
        // eslint-disable-next-line no-param-reassign
        node.data = [
          // ...gaps,
          {
            start: 1,
            end: hsp_query_from,
            shape: 'line',
            color: '#014371',
            opacity: hsp_identity / 100,
          },
          {
            start: hsp_query_from,
            end: hsp_query_to,
            // franklin $colour-sapphire-blue
            color: '#014371',
            opacity: hsp_identity / 100,
          },
          {
            start: hsp_query_to,
            end: hitLength > hsp_query_to ? hitLength : hsp_query_to,
            shape: 'line',
            color: '#014371',
            opacity: hsp_identity / 100,
          },
        ];
      }
    },
    [hsp_query_from, hsp_query_to, hsp_identity, hitLength]
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

        node.onActiveTrackChange = (trackId) => {
          console.log('on active track change:', trackId);
        };
      }
    },
    [hsp_qseq, hsp_hseq]
  );

  const navRef = useCallback((node): void => {
    if (node) {
      // const displaystart = node.getAttribute('displaystart');
      // const displayend = node.getAttribute('displayend');
      // console.log("---- start, end:", displaystart, displayend);

      node.addEventListener('change', ({ detail }) =>
        findHighlighPositions(detail)
      );
    }
  });

  // useEffect(() => {
  //   console.log("nav change:", navRef);
  // }, [navRef])

  const findHighlighPositions = ({ displaystart, displayend }) => {
    setHighlighPosition(`${displaystart}:${displayend}`);
  };

  return (
    <SlidingPanel position="bottom">
      <>
        {/* TODO close link */}
        <h4>Protein name - Organism</h4>
        {/* TODO row of buttons - Highlight properties - Show annotation - View toggle */}
        <section className="hsp-row">
          <protvista-manager attributes="displaystart displayend">
            <protvista-navigation ref={navRef} length={hsp_align_len} />
            <protvista-msa
              ref={setMSAData}
              length={hsp_align_len}
              // labelWidth="100"
            />
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
            highlight={highlightPosition}
          />
          {/* Match track - to colour based on score, see BlastSummaryTrack in BlastResultTable */}
          <protvista-track
            height="10"
            ref={setMatchTrackData}
            length={actualLength}
            layout="non-overlapping"
            highlight={highlightPosition}
          />
          {/* TODO add configured feature tracks here */}
        </section>
      </>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
