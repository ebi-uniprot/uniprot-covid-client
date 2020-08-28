import React, { useState, useCallback } from 'react';
import { DropdownButton } from 'franklin-sites';
import { uniq } from 'lodash-es';
import {
  msaColorSchemeToString,
  MsaColorScheme,
} from '../config/msaColorSchemes';
import FeatureType from '../../uniprotkb/types/featureType';
import MSAView from './MSAView';
import MSAWrappedView from './MSAWrappedView';
import { FeatureData } from '../../uniprotkb/components/protein-data-views/FeaturesView';

type EventDetail = {
  displaystart: string;
  displayend: string;
};

export type ConservationOptions = {
  'calculate-conservation'?: true;
  'overlay-conservation'?: true;
};

enum View {
  overview,
  wrapped,
}

export type MSAInput = {
  name?: string;
  accession?: string;
  sequence: string;
  from: number;
  features?: FeatureData;
};

const MSAWrapper: React.FC<{
  alignment: MSAInput[];
  tracksOffset?: number;
  alignmentLength: number;
  totalLength: number;
}> = ({ alignment, tracksOffset = 0, alignmentLength, totalLength }) => {
  const [activeView, setActiveView] = useState<View>(View.overview);
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>();
  const [highlightPosition, setHighlighPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();

  const features = alignment
    .map(({ features }) => features)
    .filter((features) => features)
    .flat();

  const annotationChoices = uniq(features?.map(({ type }) => type));
  if (!annotation && !!annotationChoices?.length) {
    setAnnotation(annotationChoices[0]);
  }

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

  const conservationOptions: ConservationOptions =
    highlightProperty === MsaColorScheme.CONSERVATION
      ? {
          'calculate-conservation': true,
          'overlay-conservation': true,
        }
      : {};

  return (
    <>
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
      <div>
        {/* {activeView === View.overview ? ( */}
        <MSAView
          alignment={alignment}
          managerRef={managerRef}
          alignmentLength={alignmentLength}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
          totalLength={totalLength}
          highlightPosition={highlightPosition}
          annotation={annotation}
          // setFeatureTrackData={setFeatureTrackData}
        />
        {/* ) : (
          <MSAWrappedView
            managerRef={managerRef}
            hsp_align_len={alignmentLength}
            hsp_qseq={hsp_qseq}
            hsp_hseq={hsp_hseq}
            hsp_hit_from={hsp_hit_from}
            hsp_query_from={hsp_query_from}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            highlightPosition={highlightPosition}
            hitAccession={hitAccession}
            annotation={annotation}
            setFeatureTrackData={setFeatureTrackData}
          />
        )} */}
      </div>
    </>
  );
};

export default MSAWrapper;
