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
};

const rowLength = 50;
const positionStride = 10;

const HSPDetailWrappedRow = ({
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
    26
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
  const locations = range(
    start + positionStride,
    end + positionStride,
    positionStride
  );

  return (
    <section className="hsp-detail-panel__visualisation">
      <section />
      <section className="hsp-locations">
        {locations.map((location) => (
          <span
            style={{
              // width: `${100 / locations.length}%`,
              width: initialSingleBaseWidth * positionStride,
              textAlign: 'right',
              paddingRight: 2,
            }}
          >
            {location}
          </span>
        ))}
      </section>

      <section className="hsp-label">Alignment</section>
      <protvista-msa
        ref={setMSAAttributes}
        length={rowLength}
        colorscheme={highlightProperty}
        {...conservationOptions}
      />
      <section className="hsp-label">{annotation}</section>
      <protvista-track
        ref={setFeatureTrackData}
        length={hitLength}
        layout="non-overlapping"
        displaystart={start}
        displayend={end}
      />
    </section>
  );
};

const HSPDetailWrapped: FC<HSPDetailWrappedProps> = ({
  managerRef,
  hsp_align_len,
  highlightProperty,
  conservationOptions,
  setQueryTrackData,
  hitLength,
  hitAccession,
  setMatchTrackData,
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
