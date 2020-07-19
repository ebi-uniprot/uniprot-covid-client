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
import aminoAcidProperties from '../../../config/aminoAcidProperties.json';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

class ColorScheme {
  colorMap: { [acid: string]: string };

  defaultColor: string;

  constructor(acids: string[], color: string, defaultColor = 'white') {
    this.colorMap = Object.fromEntries(acids.map((acid) => [acid, color]));
    this.defaultColor = defaultColor;
  }

  getColor(acid: string) {
    return acid in this.colorMap ? this.colorMap[acid] : this.defaultColor;
  }
}

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  onClose: () => void;
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({
  hsp,
  hitAccession,
  onClose,
}) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_query_to,
    hsp_qseq,
    hsp_hit_from,
    hsp_hit_to,
    hsp_hseq,
  } = hsp;
  // console.log('hsp:', hsp)
  // TODO calculate actual length based on total match and query lengths
  const actualLength = hsp_align_len;
  const [highlightPosition, setHighlighPosition] = useState('');
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [property, setProperty] = useState<keyof typeof aminoAcidProperties>();
  // const featureTrackRef = useRef();
  const regex = /([-]+)/gm;
  let match = null;
  const gaps = [];

  while ((match = regex.exec(hsp_qseq))) {
    const start = match.index;
    const end = match.index + match[0].length;
    gaps.push({ start, end });
  }

  // const highlight = "100:500";

  // console.log("gaps:", gaps);

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        // TODO calculate actual start|end based on actualLength
        // eslint-disable-next-line no-param-reassign
        node.data = [
          // {
          //   start: hsp_query_from,
          //   end: hsp_query_to,
          // },
          ...gaps,
        ];
      }
    },
    [hsp_query_from, hsp_query_to]
  );

  const setMatchTrackData = useCallback(
    (node): void => {
      if (node) {
        // TODO calculate actual start|end based on actualLength
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: hsp_hit_from,
            end: hsp_hit_to,
          },
        ];
      }
    },
    [hsp_hit_from, hsp_hit_to]
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

      node.onActiveTrackChange = (trackId) => {
        setActiveTrack(trackId);
        console.log('on active track change:', trackId);
      };

      // TODO respond to property changes: this causes an error in
      // at state.colorScheme.updateConservation(state.conservation)
      // react-msa-viewer to arise.
      // console.log('property', property);
      // if (property && aminoAcidProperties[property]) {
      //   const colorScheme = new ColorScheme(
      //     aminoAcidProperties[property].aminoAcids,
      //     aminoAcidProperties[property].colour
      //   );
      //   node.colorscheme = colorScheme;
      //   console.log(colorScheme?.getColor('R'));
      //   console.log(colorScheme?.colorMap);
      // }
    },
    [hsp_qseq, hsp_hseq]
  );

  const { loading, data, status, error } = useDataApi<UniProtkbAPIModel>(
    apiUrls.entry(hitAccession)
  );

  const features = data?.features;
  const recommendedName =
    data?.proteinDescription?.recommendedName?.fullName.value;
  const organism = data?.organism?.scientificName;

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

  const navRef = useCallback((node): void => {
    if (node) {
      // const displaystart = node.getAttribute('displaystart');
      // const displayend = node.getAttribute('displayend');
      // console.log("---- start, end:", displaystart, displayend);

      node.addEventListener('change', ({ detail }) =>
        findHighlighPositions(detail)
      );
    }
  }, []);

  // useEffect(() => {
  //   console.log("nav change:", navRef);
  // }, [navRef])

  const findHighlighPositions = ({ displaystart, displayend }) => {
    setHighlighPosition(`${displaystart}:${displayend}`);
  };

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
                  {Object.keys(aminoAcidProperties).map((propertyChoice) => (
                    // TODO: indicate currently selected
                    <li key={propertyChoice}>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMenu(false);
                          setProperty(
                            propertyChoice as keyof typeof aminoAcidProperties
                          );
                        }}
                      >
                        {propertyChoice}
                      </button>
                    </li>
                  ))}
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
          <protvista-manager attributes="displaystart displayend">
            <protvista-navigation ref={navRef} length={hsp_align_len} />
            <protvista-msa
              ref={setMSAAttributes}
              length={hsp_align_len}
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
            height="10"
            ref={setQueryTrackData}
            length={actualLength}
            layout="non-overlapping"
            highlight={highlightPosition}
          />
          {/* Match track - to colour based on score, see BlastSummaryTrack in BlastResultTable */}
          <protvista-track
            height="10"
            ref={setMatchTrackData}
            length={actualLength}
            layout="non-overlapping"
            highlight={highlightPosition}
          />
          <protvista-track
            // height="10"
            ref={setFeatureTrackData}
            length={actualLength}
            layout="non-overlapping"
            highlight={highlightPosition}
          />
        </section>
      </>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
