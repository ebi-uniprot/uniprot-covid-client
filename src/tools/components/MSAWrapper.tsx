import React, { useState, useEffect, useMemo } from 'react';
import { DropdownButton } from 'franklin-sites';
import cn from 'classnames';

import MSAView from './MSAView';
import MSAWrappedView from './MSAWrappedView';

import {
  msaColorSchemeToString,
  MsaColorScheme,
} from '../config/msaColorSchemes';

import { getFullAlignmentLength } from '../utils/sequences';

import FeatureType from '../../uniprotkb/types/featureType';
import { FeatureData } from '../../uniprotkb/components/protein-data-views/FeaturesView';

import './styles/MSAWrapper.scss';

export type ConservationOptions = {
  'calculate-conservation'?: true;
  'overlay-conservation'?: true;
};

enum View {
  overview = 'Overview',
  wrapped = 'Wrapped',
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
  const annotationChoices = useMemo(() => {
    const features = alignment
      .map(({ features }) => features)
      .flat()
      .filter((features) => features);

    return Array.from(new Set(features?.map((feature) => feature?.type)));
  }, [alignment]);

  const [activeView, setActiveView] = useState<View>(View.overview);
  const [annotation, setAnnotation] = useState<FeatureType | undefined>(
    annotationChoices[0]
  );
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>(
    MsaColorScheme.CLUSTAL
  );

  useEffect(() => {
    // if no default value was available on first render, set it now
    if (!annotation && annotationChoices.length) {
      setAnnotation(annotationChoices[0]);
    }
  }, [annotation, annotationChoices]);

  const totalLength = getFullAlignmentLength(alignment, alignmentLength);

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
                    <li key={schemeString}>
                      <button
                        type="button"
                        className={cn('button', {
                          primary: highlightProperty === schemeValue,
                          tertiary: highlightProperty !== schemeValue,
                        })}
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
        {!!annotationChoices.length && (
          <DropdownButton label="Show annotation" className="tertiary">
            {(setShowMenu: (showMenu: boolean) => void) => (
              <div className="dropdown-menu__content">
                <ul>
                  {annotationChoices.map((annotationChoice) => (
                    <li key={annotationChoice}>
                      <button
                        type="button"
                        className={cn('button', 'annotation-choice', {
                          primary: annotation === annotationChoice,
                          tertiary: annotation !== annotationChoice,
                        })}
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
                {Object.values(View).map((view) => (
                  <li key={view}>
                    <button
                      type="button"
                      className={cn('button', {
                        primary: activeView === view,
                        tertiary: activeView !== view,
                      })}
                      onClick={() => {
                        setShowMenu(false);
                        setActiveView(view);
                      }}
                    >
                      {view}
                    </button>
                  </li>
                ))}
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
          />
        ) : (
          <MSAWrappedView
            alignment={alignment}
            alignmentLength={alignmentLength}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            totalLength={totalLength}
            annotation={annotation}
          />
        )}
      </div>
    </>
  );
};

export default MSAWrapper;
