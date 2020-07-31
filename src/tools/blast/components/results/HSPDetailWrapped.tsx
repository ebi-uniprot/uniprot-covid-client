import React, { FC, useRef, useEffect, useCallback } from 'react';
import { v1 } from 'uuid';
import ProtvistaManager from 'protvista-manager';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
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

const HSPDetailWrapped: FC<HSPDetailWrappedProps> = ({
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
  console.log('setMSAAttributes:', setMSAAttributes);
  return (
    <>
      <section className="hsp-label">Alignment</section>
      <protvista-manager ref={managerRef} attributes="displaystart displayend">
        {setMSAAttributes &&
          setMSAAttributes.map((segment) => {
            const ref = useRef(null);

            // const ref = useCallback(
            //   (node): void => {
            //     if (!node) {
            //       return
            //     }

            //     node.data = segment;
            //   }
            // );

            useEffect(() => {
              if (ref.current) {
                ref.current.data = segment;
              }
            }, [ref]);

            return (
              <protvista-msa
                ref={ref}
                length={hsp_align_len}
                colorscheme={highlightProperty}
                {...conservationOptions}
                style={{ marginBottom: '1rem' }}
                key={v1()}
              />
            );
          })}
      </protvista-manager>
    </>
  );
};

export default HSPDetailWrapped;
