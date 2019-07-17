import React, { Fragment, useCallback } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaManager from 'protvista-manager';
import ProtvistaDatatable from 'protvista-datatable';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import { loadWebComponent } from '../../../utils/utils';
import { EvidenceType } from '../../../model/types/modelTypes';
import FeatureType from '../../../model/types/FeatureType';

enum LocationModifier {
  EXACT = 'EXACT',
  OUTSIDE = 'OUTSIDE',
  UNSURE = 'UNSURE',
  UNKNOWN = 'UNKNOWN',
}

type FeatureLocation = {
  value: number;
  modifier: LocationModifier;
};

export type FeatureData = {
  type: FeatureType;
  featureId?: string;
  description?: string;
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
  };
  evidences?: EvidenceType[];
}[];

type ProtvistaFeature = {
  type: string;
  description: string;
  evidences: EvidenceType[];
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
};

type FeatureProps = {
  sequence: string;
  features: FeatureData;
};

const columns = {
  type: {
    label: 'Type',
    resolver: (d: ProtvistaFeature): string => d.type,
  },
  positions: {
    label: 'Positions',
    resolver: (d: ProtvistaFeature): string =>
      `${d.startModifier === LocationModifier.UNKNOWN ? '?' : d.start}-${
        d.endModifier === LocationModifier.UNKNOWN ? '?' : d.end
      }`,
  },
  description: {
    label: 'Description',
    resolver: (d: ProtvistaFeature): string =>
      `${d.description} ${d.evidences &&
        d.evidences.map((evidence): string => `(${evidence.evidenceCode}) `)}`,
  },
};

type ProcessedDatum = {
  accession: string | undefined;
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
  type: FeatureType;
  description: string | undefined;
  evidences: EvidenceType[] | undefined;
}

const processData = (data: FeatureData): ProcessedDatum[] =>
  data.map((feature): ProcessedDatum => {
    return {
      accession: feature.featureId,
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description: feature.description,
      evidences: feature.evidences,
    };
  });

const FeaturesView: React.FC<FeatureProps> = ({ sequence, features }): JSX.Element | null => {
  loadWebComponent('protvista-track', ProtvistaTrack);
  loadWebComponent('protvista-manager', ProtvistaManager);
  loadWebComponent('protvista-datatable', ProtvistaDatatable);
  loadWebComponent('protvista-sequence', ProtvistaSequence);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);

  const processedData = processData(features);

  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = processedData;
      }
    },
    [processedData]
  );

  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = processedData;
        // eslint-disable-next-line no-param-reassign
        node.columns = columns;
      }
    },
    [processedData]
  );

  if (processedData.length <= 0) {
    return null;
  }

  return (
    <Fragment>
      <h4>Features</h4>
      <protvista-manager attributes="highlight displaystart displayend">
        <protvista-navigation length={sequence.length} />
        <protvista-track
          ref={setTrackData}
          length={sequence.length}
          layout="non-overlapping"
        />
        <protvista-sequence
          sequence={sequence}
          length={sequence.length}
          height="20"
        />
        <protvista-datatable ref={setTableData} />
      </protvista-manager>
    </Fragment>
  );
};

export default FeaturesView;
