/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
  useMemo,
  useLayoutEffect,
} from 'react';
import { v1 } from 'uuid';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
import { range } from 'lodash-es';
import {
  MsaColorScheme,
  msaColorSchemeToString,
} from '../../../config/msaColorSchemes';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { loadWebComponent } from '../../../../shared/utils/utils';

loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

const rowLength = 50;

const Locations = ({ start, end }) => {
  const ref = useCallback(
    (node) => {
      if (node && start && end) {
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start,
            end,
          },
        ];
      }
    },
    [start, end]
  );
  loadWebComponent('protvista-navigation', ProtvistaNavigation);

  return (
    <>
      <section />
      <div className="hsp-locations">
        <protvista-navigation
          ref={ref}
          length={end - start}
          height={2}
          title="Query"
        />
      </div>
    </>
  );
};

export type HSPDetailWrappedRowProps = {
  managerRef: object;
  hsp_align_len: number;
  setMSAAttributes: object[];
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: object;
  setQueryTrackData: object;
  hitLength: number;
  highlightPosition: string;
  hitAccession: string;
  setMatchTrackData: object;
  annotation: FeatureType | undefined;
  setFeatureTrackData: object;
  hsp_qseq: string;
  hsp_hseq: string;
};

const HSPDetailWrappedRow: FC<HSPDetailWrappedRowProps> = ({
  sequences,
  start,
  end,
  annotation,
  hitLength,
  setFeatureTrackData,
  conservationOptions,
  highlightProperty,
}) => {
  const [initialSingleBaseWidth, setInitialSingleBaseWidth] = useState<number>(
    24
  );
  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }
      setInitialSingleBaseWidth(node.getSingleBaseWidth());
      node.data = sequences;
    },
    [sequences]
  );

  return (
    <section className="hsp-detail-panel__visualisation">
      <Locations start={start} end={end} />
      <section className="hsp-label">Alignment</section>
      <protvista-msa
        ref={setMSAAttributes}
        length={rowLength}
        colorscheme={highlightProperty}
        {...conservationOptions}
      />
      <Locations start={start} end={end} />
      <section className="hsp-label">{annotation}</section>
      <protvista-track
        ref={setFeatureTrackData}
        length={end - start + 1}
        layout="non-overlapping"
        displaystart={start}
        displayend={end}
      />
    </section>
  );
};

export type HSPDetailWrappedProps = {
  managerRef: object;
  hsp_align_len: number;
  setMSAAttributes: object[];
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: object;
  setQueryTrackData: object;
  hitLength: number;
  highlightPosition: string;
  hitAccession: string;
  setMatchTrackData: object;
  annotation: FeatureType | undefined;
  setFeatureTrackData: object;
  hsp_qseq: string;
  hsp_hseq: string;
};

const HSPDetailWrapped: FC<HSPDetailWrappedProps> = ({
  hsp_align_len,
  highlightProperty,
  conservationOptions,
  hitLength,
  annotation,
  setFeatureTrackData,
  hsp_qseq,
  hsp_hseq,
}) => {
  const sequenceChunks = useMemo(() => {
    const numberRows = Math.ceil(hsp_align_len / rowLength);
    const chunks = [...Array(numberRows).keys()].map((index) => {
      const start = index * rowLength;
      const end = start + rowLength;
      return {
        id: `row-${index}`,
        start,
        end,
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
  }, [hsp_align_len, hsp_hseq, hsp_qseq]);
  return (
    <div style={{ overflowY: 'auto', maxHeight: '40vh' }}>
      {sequenceChunks.map(({ sequences, id, start, end }) => (
        <HSPDetailWrappedRow
          key={id}
          sequences={sequences}
          start={start}
          end={end}
          annotation={annotation}
          hitLength={hitLength}
          setFeatureTrackData={setFeatureTrackData}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
        />
      ))}
    </div>
  );
};

export default HSPDetailWrapped;
