/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useCallback, useState } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaMSA from 'protvista-msa';
import ProtvistaManager from 'protvista-manager';
import { Loader, DropdownButton, CloseIcon } from 'franklin-sites';
import { uniq } from 'lodash-es';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../../../uniprotkb/config/apiUrls';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/FeaturesView';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import {
  MsaColorScheme,
  msaColorSchemeToString,
} from '../../../config/msaColorSchemes';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  onClose: () => void;
  hitLength: number;
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({
  hsp,
  hitAccession,
  onClose,
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
    hsp_gaps,
  } = hsp;
  // TODO calculate actual length based on total match and query lengths
  // const actualLength = hsp_align_len;
  const actualLength = hitLength;
  const [highlightPosition, setHighlighPosition] = useState('');
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [property, setProperty] = useState<keyof typeof aminoAcidProperties>();
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>();
  const [, setActiveTrack] = useState<string>();
  // const featureTrackRef = useRef();
  const regex = /([-]+)/gm;
  let match = null;
  const gaps = [];

  while ((match = regex.exec(hsp_qseq))) {
    const start = match.index;
    const end = match.index + match[0].length;
    gaps.push({ start, end });
  }

  const findGaps = (seq: string) => {
    const regex = /([-]+)/gm;
    let match = null;
    const gaps = [];

    while ((match = regex.exec(seq))) {
      const start = match.index;
      const end = match.index + match[0].length;
      gaps.push([start, end]);
    }

    return gaps;
  };

  type Range = {
    [key: string]: number | null;
  };

  const findSequenceSegments = (seq: string) => {
    const ranges = [];
    const newRange = () => ({
      start: null,
      end: null,
    });

    let range: Range = newRange();

    [...seq].forEach((ch, i) => {
      if (ch !== '-') {
        if (range.start === null) {
          range.start = i + 1;
        }
      } else if (range.start !== null && range.end === null) {
        range.end = i;
        ranges.push([range.start, range.end]);
        range = newRange();
      }

      if (i === seq.length - 1 && range.end === null) {
        range.end = i + 1;
        ranges.push([range.start, range.end]);
        range = newRange();
      }
    });

    return ranges;
  };

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        const seqSegments = findSequenceSegments(hsp_qseq);
        const gaps = findGaps(hsp_qseq);
        const offset = Math.abs(hsp_hit_from - hsp_query_from);

        const blockSegments = seqSegments.map(([start, end]) => ({
          start: start + offset,
          end: end + offset,
          // franklin $colour-sapphire-blue
          color: '#014371',
          opacity: hsp_identity / 100,
        }));

        const lineSegments = gaps.map(([start, end]) => ({
          start: start + offset + 1,
          end: end + offset,
          shape: 'line',
          color: '#014371',
          opacity: hsp_identity / 100,
        }));

        lineSegments.unshift({
          start: offset,
          end: hsp_query_from + 1,
          shape: 'line',
          color: '#014371',
          opacity: hsp_identity / 100,
        });

        lineSegments.push({
          start: blockSegments[blockSegments.length - 1].end,
          end: hsp_query_to + offset,
          shape: 'line',
          color: '#014371',
          opacity: hsp_identity / 100,
        });
        // console.log("offset:", offset);
        // console.log("hsp:", hsp);
        // console.log("line segments:", lineSegments);
        // eslint-disable-next-line no-param-reassign
        node.data = [
          ...lineSegments,
          // {
          //   // start: hsp_hit_from - hsp_query_from + hsp_gaps,
          //   // end: hsp_query_from,
          //   start: offset,
          //   end: hsp_query_from + hsp_align_len + offset,
          //   shape: 'line',
          //   color: '#014371',
          //   opacity: hsp_identity / 100,
          // },
          ...blockSegments,
          // {
          //   start: hsp_query_from + offset,
          //   end: hsp_query_from + hsp_align_len + offset,
          //   // franklin $colour-sapphire-blue
          //   color: '#014371',
          //   opacity: hsp_identity / 100,
          // },
          // {
          //   start: hsp_query_to,
          //   end: hitLength > hsp_query_to ? hitLength : hsp_query_to,
          //   shape: 'line',
          //   color: '#014371',
          //   opacity: hsp_identity / 100,
          // },
        ];
      }
    },
    [hsp_query_from, hsp_query_to, hsp_identity, hitLength]
  );

  const setMatchTrackData = useCallback(
    (node): void => {
      if (node) {
        const seqSegments = findSequenceSegments(hsp_hseq);
        const gaps = findGaps(hsp_hseq);
        const offset = Math.abs(hsp_hit_from - hsp_query_from);

        const blockSegments = seqSegments.map(([start, end]) => ({
          start: start + offset,
          end: end + offset,
          // franklin $colour-sapphire-blue
          color: '#014371',
          opacity: hsp_identity / 100,
        }));

        const lineSegments = gaps.map(([start, end]) => ({
          start: start + offset + 1,
          end: end + offset,
          shape: 'line',
          color: '#014371',
          opacity: hsp_identity / 100,
        }));

        lineSegments.unshift({
          start: offset,
          end: hsp_hit_from + 1,
          shape: 'line',
          color: '#014371',
          opacity: hsp_identity / 100,
        });

        lineSegments.push({
          start: blockSegments[blockSegments.length - 1].end,
          end: hsp_hit_to + offset,
          shape: 'line',
          color: '#014371',
          opacity: hsp_identity / 100,
        });

        // eslint-disable-next-line no-param-reassign
        node.data = [
          ...lineSegments,
          // {
          //   start: 1,
          //   // end: hsp_hit_to,
          //   end: hitLength,
          //   shape: 'line',
          //   color: '#014371',
          //   opacity: hsp_identity / 100,
          // },
          ...blockSegments,
          // {
          //   start: hsp_hit_from,
          //   end: hsp_hit_from + hsp_align_len,
          //   color: '#014371',
          //   opacity: hsp_identity / 100,
          // },
        ];
      }
    },
    [hsp_hit_from, hsp_hit_to, hsp_identity, hitLength]
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }
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

      node.onActiveTrackChange = (trackId: string) => {
        setActiveTrack(trackId);
        console.log('on active track change:', trackId);
      };
    },
    [hsp_qseq, hsp_hseq]
  );

  const { loading, data, status, error } = useDataApi<UniProtkbAccessionsAPI>(
    apiUrls.entries([hitAccession])
  );

  const features = data?.results?.[0]?.features;
  const recommendedName =
    data?.results?.[0]?.proteinDescription?.recommendedName?.fullName.value;
  const organism = data?.results?.[0]?.organism?.scientificName;

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const annotationChoices = uniq(features?.map(({ type }) => type));
  if (!annotation && !!annotationChoices?.length) {
    setAnnotation(annotationChoices[0]);
  }

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && features && annotation) {
        const processedFeatures = processFeaturesData(
          features.filter(({ type }) => type === annotation)
        );
        node.data = processedFeatures;
      }
    },
    [features, annotation]
  );

  type EventDetail = {
    displaystart: string;
    displayend: string;
  };

  const findHighlighPositions = ({ displaystart, displayend }: EventDetail) => {
    setHighlighPosition(`${displaystart}:${displayend}`);
  };

  const managerRef = useCallback((node): void => {
    if (node) {
      // const displaystart = node.getAttribute('displaystart');
      // const displayend = node.getAttribute('displayend');
      // console.log("---- start, end:", displaystart, displayend);

      node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
        findHighlighPositions(detail)
      );
    }
  }, []);

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <SlidingPanel position="bottom">
      <>
        {/* TODO move to stylesheet */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0.5rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
          }}
        >
          <h4>{title}</h4>
          <button type="button" onClick={onClose}>
            <CloseIcon width="16" height="16" />
          </button>
        </div>

        <div className="button-group">
          <DropdownButton label="Highlight properties" className="tertiary">
            {(setShowMenu: (showMenu: boolean) => void) => (
              <div className="dropdown-menu__content">
                <ul>
                  {Object.entries(msaColorSchemeToString).map(
                    ([schemeValue, schemeString]) => (
                      // TODO: indicate currently selected
                      <li key={schemeString}>
                        <button
                          type="button"
                          onClick={() => {
                            setShowMenu(false);
                            setHighlightProperty(schemeValue as MsaColorScheme);
                          }}
                        >
                          {schemeString}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </DropdownButton>
          {!!annotationChoices?.length && (
            <DropdownButton label="Show annotation" className="tertiary">
              {(setShowMenu: (showMenu: boolean) => void) => (
                <div className="dropdown-menu__content">
                  <ul>
                    {annotationChoices.map((annotationChoice) => (
                      // TODO: indicate currently selected
                      <li key={annotationChoice}>
                        <button
                          type="button"
                          onClick={() => {
                            setShowMenu(false);
                            setAnnotation(annotationChoice);
                          }}
                        >
                          {annotationChoice}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </DropdownButton>
          )}
          <DropdownButton label="View" className="tertiary">
            <div className="dropdown-menu__content">
              <ul>
                <li key="overview">Overview</li>
                <li key="wrapped">Wrapped</li>
              </ul>
            </div>
          </DropdownButton>
        </div>
        <section className="hsp-row">
          <protvista-manager
            ref={managerRef}
            attributes="displaystart displayend"
          >
            <protvista-navigation length={hsp_align_len} />
            <protvista-msa
              ref={setMSAAttributes}
              length={hsp_align_len}
              colorscheme={highlightProperty}
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
            height="30"
            ref={setQueryTrackData}
            length={actualLength}
            layout="overlapping"
            highlight={highlightPosition}
          />
          {/* Match track - to colour based on score, see BlastSummaryTrack in BlastResultTable */}
          <protvista-track
            height="30"
            ref={setMatchTrackData}
            length={actualLength}
            layout="overlapping"
            highlight={highlightPosition}
          />
          {/* <protvista-track
            // height="10"
            ref={setFeatureTrackData}
            length={actualLength}
            layout="non-overlapping"
            highlight={highlightPosition}
          /> */}
        </section>
      </>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
