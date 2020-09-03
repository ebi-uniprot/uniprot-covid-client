import React, { useState } from 'react';
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
import { getFullAlignmentLength } from '../utils/sequences';

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
  to: number;
  length: number;
  features?: FeatureData;
};

const MSAWrapper: React.FC<{
  alignment: MSAInput[];
  alignmentLength: number;
}> = ({ alignment, alignmentLength }) => {
  const [activeView, setActiveView] = useState<View>(View.overview);
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>();
  const [selectedId, setSelectedId] = useState<string | undefined>(
    alignment
      .filter(({ accession }) => accession)
      .map(({ accession }) => accession)[0]
  );

  const totalLength = getFullAlignmentLength(alignment, alignmentLength);

  const features = alignment
    .map(({ features }) => features)
    .flat()
    .filter((features) => features);

  const annotationChoices = uniq(features?.map((feature) => feature?.type));
  if (!annotation && !!annotationChoices?.length) {
    setAnnotation(annotationChoices[0]);
  }

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
        {activeView === View.overview ? (
          <MSAView
            alignment={alignment}
            alignmentLength={alignmentLength}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            totalLength={totalLength}
            annotation={annotation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ) : (
          <MSAWrappedView
            alignment={alignment}
            alignmentLength={alignmentLength}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            totalLength={totalLength}
            annotation={annotation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
      </div>
    </>
  );
};

export default MSAWrapper;
