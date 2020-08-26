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
import MSAView from '../../../components/MSAView';
import HSPDetailWrapped from '../../../components/MSAWrappedView';
import {
  MsaColorScheme,
  msaColorSchemeToString,
} from '../../../config/msaColorSchemes';
import './styles/HSPDetailPanel.scss';
import {
  getFullAlignmentLength,
  getFullAlignmentSegments,
  getOffset,
  transformFeaturesPositions,
} from '../../utils/hsp';

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

enum View {
  overview,
  wrapped,
}

export type ConservationOptions = {
  'calculate-conservation'?: true;
  'overlay-conservation'?: true;
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
    hsp_hseq,
  } = hsp;
  // TODO calculate actual length based on total match and query lengths
  const [highlightPosition, setHighlighPosition] = useState('');
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>();
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [activeView, setActiveView] = useState<View>(View.overview);
  const tracksOffset = getOffset(hsp);
  const totalLength = getFullAlignmentLength(hsp, queryLength, hitLength);
  const segments = getFullAlignmentSegments(hsp, queryLength, hitLength);
  // Reset view when different hit is being viewed
  useEffect(() => {
    setActiveView(View.overview);
    setAnnotation(undefined);
    setHighlightProperty(undefined);
  }, [hitAccession]);

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = segments.querySegments;
      }
    },
    [segments.querySegments]
  );

  const setMatchTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = segments.hitSegments;
      }
    },
    [segments.hitSegments]
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }

      const displayEndValue = hsp_align_len / (15 / node.getSingleBaseWidth());
      if (
        displayEndValue < hsp_hseq.length ||
        displayEndValue < hsp_qseq.length
      ) {
        setInitialDisplayEnd(displayEndValue);
      } else {
        setInitialDisplayEnd(
          hsp_hseq.length > hsp_qseq.length ? hsp_hseq.length : hsp_qseq.length
        );
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
        if (activeView === View.wrapped) {
          processedFeatures = transformFeaturesPositions(processedFeatures);
        }
        node.data = processedFeatures;
      }
    },
    [features, annotation, activeView]
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
          `${tracksOffset}:${tracksOffset + initialDisplayEnd}`
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
  const conservationOptions: ConservationOptions =
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
                      setActiveView(View.overview);
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
                      setActiveView(View.wrapped);
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
        {activeView === View.overview ? (
          <MSAView
            managerRef={managerRef}
            hsp_align_len={hsp_align_len}
            setMSAAttributes={setMSAAttributes}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            setQueryTrackData={setQueryTrackData}
            totalLength={totalLength}
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
