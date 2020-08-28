/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { FC, useCallback } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
import { MsaColorScheme } from '../config/msaColorSchemes';
import FeatureType from '../../uniprotkb/types/featureType';
import { loadWebComponent } from '../../shared/utils/utils';
import { MSAInput, ConservationOptions } from './MSAWrapper';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

export type MSAViewProps = {
  managerRef: (node: HTMLElement) => void;
  alignment: MSAInput[];
  alignmentLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  totalLength: number;
  highlightPosition: string;
  annotation: FeatureType | undefined;
  // setFeatureTrackData: (node: HTMLElement) => void;
};

const MSAView: FC<MSAViewProps> = ({
  alignment,
  managerRef,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  totalLength,
  highlightPosition,
  annotation,
  // setFeatureTrackData,
}) => {
  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }

      // const displayEndValue = hsp_align_len / (15 / node.getSingleBaseWidth());
      // if (
      //   displayEndValue < hsp_hseq.length ||
      //   displayEndValue < hsp_qseq.length
      // ) {
      //   setInitialDisplayEnd(displayEndValue);
      // } else {
      //   setInitialDisplayEnd(
      //     hsp_hseq.length > hsp_qseq.length ? hsp_hseq.length : hsp_qseq.length
      //   );
      // }

      node.data = alignment.map(({ name, sequence }) => ({ name, sequence }));

      // node.data = [
      //   {
      //     name: 'Query',
      //     sequence: hsp_qseq,
      //   },
      //   {
      //     name: 'Match',
      //     sequence: hsp_hseq,
      //   },
      // ];
    },
    [alignment]
  );

  // const setQueryTrackData = useCallback(
  //   (node): void => {
  //     if (node) {
  //       // eslint-disable-next-line no-param-reassign
  //       node.data = segments.querySegments;
  //     }
  //   },
  //   [segments.querySegments]
  // );

  // const setMatchTrackData = useCallback(
  //   (node): void => {
  //     if (node) {
  //       // eslint-disable-next-line no-param-reassign
  //       node.data = segments.hitSegments;
  //     }
  //   },
  //   [segments.hitSegments]
  // );

  return (
    <section
      data-testid="overview-hsp-detail"
      className="hsp-detail-panel__visualisation"
    >
      {/* Query track */}
      {/* <section className="hsp-label">Query</section>
      <protvista-track
        height="30"
        ref={setQueryTrackData}
        length={totalLength}
        layout="overlapping"
        highlight={highlightPosition}
      /> */}
      {/* Match track - coloured based on score */}
      {/* <section className="hsp-label">
        <Link to={`/uniprotkb/${hitAccession}`}>{hitAccession}</Link>
      </section>
      <protvista-track
        height="30"
        ref={setMatchTrackData}
        length={totalLength}
        layout="overlapping"
        highlight={highlightPosition}
      /> */}
      {/* <section className="hsp-label">{annotation}</section>
      <protvista-track
        ref={setFeatureTrackData}
        length={totalLength}
        layout="non-overlapping"
        highlight={highlightPosition}
      /> */}
      <section className="hsp-label">Alignment</section>
      <protvista-manager ref={managerRef} attributes="displaystart displayend">
        <protvista-navigation length={alignmentLength} />
        <protvista-msa
          ref={setMSAAttributes}
          labelwidth={200}
          length={alignmentLength}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </protvista-manager>
    </section>
  );
};

export default MSAView;
