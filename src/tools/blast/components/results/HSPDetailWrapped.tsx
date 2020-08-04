import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from 'react';
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
  // console.log('setMSAAttributes:', setMSAAttributes);
  // const [elRefs, setElRefs] = useState([]);
  // let elRefs = useRef([]);
  // let elRefs = [];

  // let msaSegments = [];

  //   useEffect(() => {
  //     elRefs = Array(setMSAAttributes.length)
  //       .fill(null)
  //       .map((_, i) => elRefs.current[i] || createRef())
  // // console.log("refs updated:", elRefs);

  //     // elRefs.current.forEach((ref, i) => {
  //       .forEach((ref, i) => {

  //       if (ref) {
  //         // elRefs.current[i].current.data = segment;
  //         console.log("ref current:", ref);
  //       }

  //       msaSegments[i] = (
  //         <protvista-msa
  //           ref={ref}
  //           length={hsp_align_len}
  //           colorscheme={highlightProperty}
  //           {...conservationOptions}
  //           style={{ marginBottom: '1rem' }}
  //           key={v1()}
  //               />
  //       )
  //     });

  //   }, [setMSAAttributes.length]);

  //   useEffect(() => {
  // console.log("refs assigned:", elRefs);
  //   }, [elRefs.current[0]]);

  // useEffect(() => {
  //   setElRefs(elRefs => (
  //     Array(setMSAAttributes.length)
  //       .fill()
  //       .map((_, i) => elRefs[i] || createRef())
  //   ));
  // }, [setMSAAttributes.length]);

  //   const refs = setMSAAttributes &&
  //     setMSAAttributes.map(() => useRef(null));

  //   useEffect(() => {
  //     // If not all refs are ready, return
  //     if (refs.find((ref) => ref.current === null)) {
  //       return;
  //     }
  //     // ...otherwise assign data
  //     setMSAAttributes.forEach((segment, i) => {
  //       if (refs[i]?.current) {
  //         refs[i].current.data = segment;
  //       }
  //     });
  // console.log("refs updated:", refs);
  //   }, [refs, setMSAAttributes.length]);

  //   useEffect(() => {
  // console.log("refs updated:", elRefs);
  //   }, [setMSAAttributes.length]);

  const [segments, setSegments] = useState([]);

  // const elRefs = useRef(setMSAAttributes.map(() => createRef()));
  const elRefs = useRef(
    setMSAAttributes.map((seg) =>
      useRef({
        data: seg,
      })
    )
  );

  // let msaSegments;

  useEffect(() => {
    // msaSegments = elRefs.current.map(
    setSegments(
      elRefs.current.map((ref, i) => {
        if (ref.current) {
          ref.current.data = setMSAAttributes[i];
          // ref.current.dataset = setMSAAttributes[i];
        }

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
      })
    );
  }, [setMSAAttributes.length]);

  //   useEffect(() => {
  // console.log("ref updates:", elRefs);
  // console.log("msaSegments:", msaSegments);
  //   }, [setMSAAttributes.length, elRefs, elRefs.current]);

  // console.log("el refs:", elRefs);
  console.log('segments:', segments);
  return (
    <>
      <section className="hsp-label">Alignment</section>
      <protvista-manager ref={managerRef} attributes="displaystart displayend">
        {/* msaSegments */}
        {segments}
        {setMSAAttributes.length &&
          setMSAAttributes.forEach((segment, index) => {
            // const ref = elRefs.current[index];
            // const ref = elRefs[index];
            //             useEffect(() => {
            //               if (ref) {
            //                 ref.data = segment;
            // console.log("ref data:", ref.data);
            //               }
            //             }, [elRefs]);
            // console.log("ref:", elRefs.current[index]);
            // return (
            //   <protvista-msa
            //     // ref={ref => {
            //     //   console.log("new ref:", ref);
            //     //   elRefs.current[index] = ref;
            //     // }}
            //     ref={elRefs.current[index]}
            //     length={hsp_align_len}
            //     colorscheme={highlightProperty}
            //     {...conservationOptions}
            //     style={{ marginBottom: '1rem' }}
            //     key={v1()}
            //   />
            // );
          })}
      </protvista-manager>
    </>
  );
};

export default HSPDetailWrapped;
