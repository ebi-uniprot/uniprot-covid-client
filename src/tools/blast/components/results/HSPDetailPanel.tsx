/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaMSA from 'protvista-msa';
import ProtvistaManager from 'protvista-manager';
import { Loader } from 'franklin-sites';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../../../uniprotkb/config/apiUrls';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/FeaturesView';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({ hsp, hitAccession }) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_query_to,
    hsp_qseq,
    hsp_hit_from,
    hsp_hit_to,
    hsp_hseq,
  } = hsp;
  console.log('hsp:', hsp, 'accession', hitAccession);
  // TODO calculate actual length based on total match and query lengths
  const actualLength = hsp_align_len;
  const [highlightPosition, setHighlighPosition] = useState('');
  const [activeTrack, setActiveTrack] = useState('');
  // const featureTrackRef = useRef();

  const regex = /([-]+)/gm;
  let match = null;
  const gaps = [];

  while ((match = regex.exec(hsp_qseq))) {
    const start = match.index;
    const end = match.index + match[0].length;
    gaps.push({ start, end });
  }

  // const highlight = "100:500";

  // console.log("gaps:", gaps);

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        // TODO calculate actual start|end based on actualLength
        // eslint-disable-next-line no-param-reassign
        node.data = [
          // {
          //   start: hsp_query_from,
          //   end: hsp_query_to,
          // },
          ...gaps,
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
          setActiveTrack(trackId);
          console.log('on active track change:', trackId);
        };
      }
    },
    [hsp_qseq, hsp_hseq]
  );
  const { loading, data, error } = useDataApi<UniProtkbAPIModel>(
    apiUrls.entry(hitAccession)
  );
  const features = data?.features;
  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && features) {
        const processedFeatures = processFeaturesData(
          features.filter(({ type }) => type === FeatureType.DOMAIN)
        );
        node.data = processedFeatures;
      }
    },
    [features]
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
  }, []);

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
          {loading ? (
            <Loader />
          ) : (
            <protvista-track
              // height="10"
              ref={setFeatureTrackData}
              length={actualLength}
              layout="non-overlapping"
              highlight={highlightPosition}
            />
          )}
        </section>
      </>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
