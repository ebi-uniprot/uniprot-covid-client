/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { FC, useCallback, useState, useEffect } from 'react';
import { Loader, DropdownButton, CloseIcon } from 'franklin-sites';
import { uniq } from 'lodash-es';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { getAccessionsURL } from '../../../../uniprotkb/config/apiUrls';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/FeaturesView';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HSPDetailOverview from './HSPDetailOverview';
import HSPDetailWrapped from './HSPDetailWrapped';
import {
  MsaColorScheme,
  msaColorSchemeToString,
} from '../../../config/msaColorSchemes';
import { findSequenceSegments } from '../../../utils';
import './styles/HSPDetailPanel.scss';

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  onClose: () => void;
  hitLength: number;
  queryLength: number;
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({
  hsp,
  hitAccession,
  onClose,
  hitLength,
  queryLength,
}) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_qseq,
    hsp_hit_from,
    hsp_hit_to,
    hsp_hseq,
    hsp_identity,
  } = hsp;
  // TODO calculate actual length based on total match and query lengths
  const [highlightPosition, setHighlighPosition] = useState('');
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>();
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [activeView, setActiveView] = useState<'overview' | 'wrapped'>(
    'overview'
  );
  const tracksOffset = Math.abs(hsp_hit_from - hsp_query_from);

  useEffect(() => {
    setHighlighPosition('0:0');
  }, [hsp_hit_from, hsp_query_from]);

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        const seqSegments = findSequenceSegments(hsp_qseq);
        const opacity = hsp_identity / 100;

        const blockSegments = seqSegments.map(([start, end]) => ({
          start: start + tracksOffset,
          end: end + tracksOffset,
          // franklin $colour-sapphire-blue
          color: '#014371',
          opacity,
        }));

        const lineSegments = [
          {
            start: tracksOffset + 1,
            end: hsp_query_from + 1,
            shape: 'line',
            color: '#014371',
            opacity,
          },
          {
            start: blockSegments[blockSegments.length - 1].end + 1,
            end: queryLength + tracksOffset,
            shape: 'line',
            color: '#014371',
            opacity,
          },
        ];

        // eslint-disable-next-line no-param-reassign
        node.data = [...lineSegments, ...blockSegments];
      }
    },
    [hsp_query_from, hsp_identity, hsp_qseq, queryLength, tracksOffset]
  );

  const setMatchTrackData = useCallback(
    (node): void => {
      if (node) {
        const seqSegments = findSequenceSegments(hsp_hseq);
        const opacity = hsp_identity / 100;

        const blockSegments = seqSegments.map(([start, end]) => ({
          start: start + tracksOffset,
          end: end + tracksOffset,
          // franklin $colour-sapphire-blue
          color: '#014371',
          opacity,
        }));

        const lineSegments = [
          {
            start: 1,
            end: tracksOffset,
            shape: 'line',
            color: '#014371',
            opacity,
          },
          {
            start: blockSegments[blockSegments.length - 1].end + 1,
            end: hitLength,
            shape: 'line',
            color: '#014371',
            opacity,
          },
        ];

        // eslint-disable-next-line no-param-reassign
        node.data = [...lineSegments, ...blockSegments];
      }
    },
    [hsp_identity, hitLength, hsp_hseq, tracksOffset]
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }
      setInitialDisplayEnd(hsp_align_len / (15 / node.getSingleBaseWidth()));
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
    },
    [hsp_qseq, hsp_hseq, hsp_align_len]
  );

  const { loading, data, status, error } = useDataApi<UniProtkbAccessionsAPI>(
    getAccessionsURL([hitAccession], { facets: [] })
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
        let processedFeatures = processFeaturesData(
          features.filter(({ type }) => type === annotation)
        );
        if (activeView === 'wrapped') {
          processedFeatures = processedFeatures
            .map((feature) => ({
              ...feature,
              start: feature.start - hsp_hit_from,
            }))
            .filter(({ start }) => start >= 0 && start <= hsp_hit_to);
        }
        node.data = processedFeatures;
      }
    },
    [features, annotation, activeView, hsp_hit_from, hsp_hit_to]
  );

  type EventDetail = {
    displaystart: string;
    displayend: string;
  };

  const findHighlighPositions = useCallback(
    ({ displaystart, displayend }: EventDetail) => {
      const start = tracksOffset + parseInt(displaystart, 10);
      const end = tracksOffset + parseInt(displayend, 10);
      setHighlighPosition(`${start}:${end}`);
    },
    [tracksOffset]
  );

  const managerRef = useCallback(
    (node): void => {
      if (node && initialDisplayEnd) {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlighPositions(detail)
        );
        node.setAttribute('displaystart', 1);
        node.setAttribute('displayend', initialDisplayEnd);
        setHighlighPosition(
          `${tracksOffset + 1}:${tracksOffset + initialDisplayEnd}`
        );
      }
    },
    [initialDisplayEnd, findHighlighPositions, tracksOffset]
  );

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading) {
    return <Loader />;
  }
  const conservationOptions =
    highlightProperty === MsaColorScheme.CONSERVATION
      ? {
          'calculate-conservation': true,
          'overlay-conservation': true,
        }
      : {};

  return (
    <SlidingPanel position="bottom" className="hsp-detail-panel">
      <div className="hsp-detail-panel__header">
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
                        className="annotation-choice"
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
          {(setShowMenu: (showMenu: boolean) => void) => (
            <div className="dropdown-menu__content">
              <ul>
                <li key="overview">
                  <button
                    type="button"
                    className="button tertiary"
                    onClick={() => {
                      setShowMenu(false);
                      setActiveView('overview');
                    }}
                  >
                    Overview
                  </button>
                </li>
                <li key="wrapped">
                  <button
                    type="button"
                    className="button tertiary"
                    onClick={() => {
                      setShowMenu(false);
                      setActiveView('wrapped');
                    }}
                  >
                    Wrapped
                  </button>
                </li>
              </ul>
            </div>
          )}
        </DropdownButton>
      </div>
      <div className="hsp-detail-panel__body">
        {activeView === 'overview' ? (
          <HSPDetailOverview
            managerRef={managerRef}
            hsp_align_len={hsp_align_len}
            setMSAAttributes={setMSAAttributes}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            setQueryTrackData={setQueryTrackData}
            hitLength={hitLength}
            highlightPosition={highlightPosition}
            hitAccession={hitAccession}
            setMatchTrackData={setMatchTrackData}
            annotation={annotation}
            setFeatureTrackData={setFeatureTrackData}
          />
        ) : (
          <HSPDetailWrapped
            managerRef={managerRef}
            hsp_align_len={hsp_align_len}
            hsp_qseq={hsp_qseq}
            hsp_hseq={hsp_hseq}
            hsp_hit_from={hsp_hit_from}
            hsp_query_from={hsp_query_from}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            setQueryTrackData={setQueryTrackData}
            highlightPosition={highlightPosition}
            hitAccession={hitAccession}
            setMatchTrackData={setMatchTrackData}
            annotation={annotation}
            setFeatureTrackData={setFeatureTrackData}
          />
        )}
      </div>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
