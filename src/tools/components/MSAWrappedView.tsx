/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';

import { loadWebComponent } from '../../shared/utils/utils';

import useSize from '../../shared/hooks/useSize';
import useSafeState from '../../shared/hooks/useSafeState';
import useStaggeredRenderingHelper from '../../shared/hooks/useStaggeredRenderingHelper';

import { MsaColorScheme } from '../config/msaColorSchemes';

import FeatureType from '../../uniprotkb/types/featureType';
import { ConservationOptions } from './MSAWrapper';
import { MSAViewProps } from './MSAView';
import {
  FeatureData,
  processFeaturesData,
} from '../../uniprotkb/components/protein-data-views/FeaturesView';
import { transformFeaturesPositions } from '../utils/sequences';

loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);
loadWebComponent('protvista-navigation', ProtvistaNavigation);

const widthOfAA = 20;

type Sequence = {
  name: string;
  sequence: string;
  start: number;
  end: number;
  features?: FeatureData;
};

type Chunk = {
  id: string;
  sequences: Sequence[];
};

export type HSPDetailWrappedRowProps = {
  rowLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  annotation: FeatureType | undefined;
  sequences: Sequence[];
  selectedId: string;
  setSelectedId: () => void;
};

const HSPDetailWrappedRow: FC<HSPDetailWrappedRowProps> = ({
  rowLength,
  highlightProperty,
  conservationOptions,
  annotation,
  sequences,
  selectedId,
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

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && annotation) {
        const featuresSeq = sequences.find(({ name }) => name === selectedId);
        const features = featuresSeq?.features?.filter(
          ({ type }) => type === annotation
        );
        if (featuresSeq && features) {
          let processedFeatures = processFeaturesData(features);
          processedFeatures = transformFeaturesPositions(processedFeatures);
          node.data = processedFeatures;
          node.setAttribute('length', featuresSeq.end - featuresSeq.start + 1);
          node.setAttribute('displaystart', featuresSeq.start);
          node.setAttribute('displayend', featuresSeq.end);
        }
      }
    },
    [annotation, selectedId, sequences]
  );

  return (
    <section
      data-testid="wrapped-hsp-detail"
      className="hsp-detail-panel__visualisation hsp-detail-panel__visualisation__wrapped-row"
    >
      {/* <section className="query-ruler">
        <protvista-navigation
          length={rowLength}
          height={2}
          rulerstart={ranges.query.start}
        />
      </section> */}
      <section className="hsp-label hsp-label--msa">Alignment</section>
      <section className="hsp-detail-panel__visualisation--msa">
        <protvista-msa
          ref={setMSAAttributes}
          length={rowLength}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </section>
      {/* <section className="hit-ruler">
        <protvista-navigation
          length={rowLength}
          height={2}
          rulerstart={ranges.hit.start}
        />
      </section> */}
      <section className="hsp-label hsp-label--track">{annotation}</section>
      <section className="hsp-detail-panel__visualisation--track">
        <protvista-track ref={setFeatureTrackData} />
      </section>
    </section>
  );
};

// export type HSPDetailWrappedProps = {
//   hsp_align_len: number;
//   highlightProperty: MsaColorScheme | undefined;
//   conservationOptions: ConservationOptions;
//   highlightPosition: string;
//   hitAccession: string;
//   annotation: FeatureType | undefined;
//   setFeatureTrackData: (node: HTMLElement) => void;
//   hsp_qseq: string;
//   hsp_hseq: string;
//   hsp_hit_from: number;
//   hsp_query_from: number;
// };

const MSAWrappedView: FC<MSAViewProps> = ({
  alignment,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  annotation,
}) => {
  const [selectedId, setSelectedId] = useState();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size] = useSize(containerRef);

  const [rowLength, setRowLength] = useSafeState(0);
  const nItemsToRender = useStaggeredRenderingHelper({
    first: 4,
    increment: +Infinity,
    max: +Infinity,
    delay: 500,
  });

  const debouncedSetRowLength = useMemo(
    () =>
      debounce((width: number) => {
        // using 9 tenths of the available size as its the proportion assigned
        // to the track in the CSS
        setRowLength(Math.floor((0.9 * width) / widthOfAA));
      }, 1000),
    [setRowLength]
  );

  if (size?.width) {
    debouncedSetRowLength(size.width);
    if (!rowLength) {
      // when it passes from 0 to any value, don't debounce
      debouncedSetRowLength.flush();
    }
  }

  const sequenceChunks = useMemo<Chunk[]>(() => {
    if (!rowLength) {
      return [];
    }

    const numberRows = Math.ceil(alignmentLength / rowLength);
    const chunks = [...Array(numberRows).keys()].map((index) => {
      const start = index * rowLength;
      const end = start + rowLength;
      return {
        // FIXME: UGLY trick to have the whole track re-render on change of size
        // at the moment when the track is updated instead of re-rendered, we
        // get a weird effect towards the end of the track.
        // Need to check with the MSA track itself in Nightingale
        id: `row-${Math.random()}`,
        sequences: alignment.map(({ name, sequence, from, features }) => ({
          name,
          sequence: sequence.slice(start, end),
          start: start + from,
          end: end + from - 1,
          features,
        })),
      };
    });
    return chunks;
  }, [alignment, alignmentLength, rowLength]);

  return (
    <div ref={containerRef}>
      {sequenceChunks.map(({ sequences, id }, index) => {
        if (index < nItemsToRender) {
          return (
            <HSPDetailWrappedRow
              key={id}
              rowLength={rowLength}
              sequences={sequences}
              annotation={annotation}
              highlightProperty={highlightProperty}
              conservationOptions={conservationOptions}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          );
        }
        return <section key={id} className="hsp-detail-panel__placeholder" />;
      })}
    </div>
  );
};

export default MSAWrappedView;
