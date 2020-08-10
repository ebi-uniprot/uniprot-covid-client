/* eslint-disable camelcase */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
import { MsaColorScheme } from '../../../config/msaColorSchemes';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { loadWebComponent } from '../../../../shared/utils/utils';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

export type HSPDetailOverviewProps = {
  managerRef: object;
  hsp_align_len: number;
  setMSAAttributes: object;
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

const HSPDetailOverview: FC<HSPDetailOverviewProps> = ({
  managerRef,
  hsp_align_len,
  setMSAAttributes,
  highlightProperty,
  conservationOptions,
  setQueryTrackData,
  hitLength,
  highlightPosition,
  hitAccession,
  setMatchTrackData,
  annotation,
  setFeatureTrackData,
}) => {
  return (
    <section className="hsp-detail-panel__visualisation">
      <section className="hsp-label">Alignment</section>
      <protvista-manager ref={managerRef} attributes="displaystart displayend">
        <protvista-navigation length={hsp_align_len} />
        <protvista-msa
          ref={setMSAAttributes}
          length={hsp_align_len}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </protvista-manager>
      {/* 
          TODO listen to "highlight" event from block above and set on these 2 tracks,
          working as protvista-manager
          */}
      {/* Query track */}
      <section className="hsp-label">Query</section>
      <protvista-track
        height="30"
        ref={setQueryTrackData}
        length={hitLength}
        layout="overlapping"
        highlight={highlightPosition}
      />
      {/* Match track - to colour based on score, see BlastSummaryTrack in BlastResultTable */}
      <section className="hsp-label">
        <Link to={`/uniprotkb/${hitAccession}`}>{hitAccession}</Link>
      </section>
      <protvista-track
        height="30"
        ref={setMatchTrackData}
        length={hitLength}
        layout="overlapping"
        highlight={highlightPosition}
      />
      <section className="hsp-label">{annotation}</section>
      <protvista-track
        ref={setFeatureTrackData}
        length={hitLength}
        layout="non-overlapping"
        highlight={highlightPosition}
      />
    </section>
  );
};

export default HSPDetailOverview;
