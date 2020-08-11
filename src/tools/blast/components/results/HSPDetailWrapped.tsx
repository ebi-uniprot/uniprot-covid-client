/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import React, { FC, useCallback, useMemo } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
import { MsaColorScheme } from '../../../config/msaColorSchemes';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { loadWebComponent } from '../../../../shared/utils/utils';
import { ConservationOptions } from './HSPDetailPanel';

loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);
loadWebComponent('protvista-navigation', ProtvistaNavigation);

// TODO replace with useSize hook
const rowLength = 60;

type Sequence = {
  name: string;
  sequence: string;
};

type Ranges = {
  hit: {
    start: number;
    end: number;
  };
  query: {
    start: number;
    end: number;
  };
};

export type HSPDetailWrappedRowProps = {
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  annotation: FeatureType | undefined;
  setFeatureTrackData: (node: HTMLElement) => void;
  sequences: Sequence[];
  ranges: Ranges;
};

const HSPDetailWrappedRow: FC<HSPDetailWrappedRowProps> = ({
  sequences,
  ranges,
  annotation,
  setFeatureTrackData,
  conservationOptions,
  highlightProperty,
}) => {
  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }
      node.data = sequences;
    },
    [sequences]
  );

  return (
    <section
      data-testid="wrapped-hsp-detail"
      className="hsp-detail-panel__visualisation hsp-detail-panel__visualisation__wrapped-row"
    >
      <section className="query-ruler">
        <protvista-navigation
          length={rowLength}
          height={2}
          rulerstart={ranges.query.start}
        />
      </section>
      <section className="hsp-label hsp-label--msa">Alignment</section>
      <section className="hsp-detail-panel__visualisation--msa">
        <protvista-msa
          ref={setMSAAttributes}
          length={rowLength}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </section>
      <section className="hit-ruler">
        <protvista-navigation
          length={rowLength}
          height={2}
          rulerstart={ranges.hit.start}
        />
      </section>
      <section className="hsp-label hsp-label--track">{annotation}</section>
      <section className="hsp-detail-panel__visualisation--track">
        <protvista-track
          ref={setFeatureTrackData}
          length={ranges.hit.end - ranges.hit.start + 1}
          layout="non-overlapping"
          displaystart={ranges.hit.start}
          displayend={ranges.hit.end}
        />
      </section>
    </section>
  );
};

export type HSPDetailWrappedProps = {
  managerRef: (node: HTMLElement) => void;
  hsp_align_len: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  setQueryTrackData: (node: HTMLElement) => void;
  highlightPosition: string;
  hitAccession: string;
  setMatchTrackData: (node: HTMLElement) => void;
  annotation: FeatureType | undefined;
  setFeatureTrackData: (node: HTMLElement) => void;
  hsp_qseq: string;
  hsp_hseq: string;
  hsp_hit_from: number;
  hsp_query_from: number;
};

const HSPDetailWrapped: FC<HSPDetailWrappedProps> = ({
  hsp_align_len,
  highlightProperty,
  conservationOptions,
  annotation,
  setFeatureTrackData,
  hsp_qseq,
  hsp_hseq,
  hsp_hit_from,
  hsp_query_from,
}) => {
  const sequenceChunks = useMemo(() => {
    const numberRows = Math.ceil(hsp_align_len / rowLength);
    const chunks = [...Array(numberRows).keys()].map((index) => {
      const start = index * rowLength;
      const end = start + rowLength;
      return {
        id: `row-${index}`,
        ranges: {
          hit: {
            start: start + hsp_hit_from,
            end: end + hsp_hit_from - 1,
          },
          query: {
            start: start + hsp_query_from,
            end: end + hsp_query_from - 1,
          },
        },
        sequences: [
          {
            name: 'Query',
            sequence: hsp_qseq.slice(start, end),
          },
          {
            name: 'Match',
            sequence: hsp_hseq.slice(start, end),
          },
        ],
      };
    });
    return chunks;
  }, [hsp_align_len, hsp_hit_from, hsp_hseq, hsp_qseq, hsp_query_from]);
  return (
    <>
      {sequenceChunks.map(({ sequences, id, ranges }) => (
        <HSPDetailWrappedRow
          key={id}
          sequences={sequences}
          ranges={ranges}
          annotation={annotation}
          setFeatureTrackData={setFeatureTrackData}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
        />
      ))}
    </>
  );
};

export default HSPDetailWrapped;
