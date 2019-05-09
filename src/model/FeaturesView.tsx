import React, { Fragment, useCallback } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaManager from 'protvista-manager';
import ProtvistaDatatable from 'protvista-datatable';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import { loadWebComponent } from '../utils/utils';
import FeatureTypes from './types/featureTypes';
import { EvidenceType } from './types/modelTypes';

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

type Feature = {
  type: string;
  featureId?: string;
  description?: string;
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
  };
  evidences?: EvidenceType[];
};

type ProtvistaFeature = {
  type: string;
  description: string;
  evidences: EvidenceType[];
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
};

type FeaturesViewProps = {
  data: {
    sequence: {
      value: string;
    };
    features?: Feature[];
  };
  types?: FeatureTypes[];
};

const columns = {
  type: {
    label: 'Type',
    resolver: (d: ProtvistaFeature) => d.type,
  },
  positions: {
    label: 'Positions',
    resolver: (d: ProtvistaFeature) => {
      return `${d.startModifier === LocationModifier.UNKNOWN ? '?' : d.start}-${
        d.endModifier === LocationModifier.UNKNOWN ? '?' : d.end
      }`;
    },
  },
  description: {
    label: 'Description',
    resolver: (d: ProtvistaFeature) => {
      return `${d.description} ${d.evidences &&
        d.evidences.map(evidence => `(${evidence.evidenceCode}) `)}`;
    },
  },
};

const processData = (data: Feature[], types: string[] = []) =>
  data
    .filter(feature => {
      return types.length <= 0 || types.includes(feature.type);
    })
    .map(feature => {
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

const FeaturesView: React.FC<FeaturesViewProps> = ({ data, types }) => {
  loadWebComponent('protvista-track', ProtvistaTrack);
  loadWebComponent('protvista-manager', ProtvistaManager);
  loadWebComponent('protvista-datatable', ProtvistaDatatable);
  loadWebComponent('protvista-sequence', ProtvistaSequence);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);

  if (!data.features) {
    return null;
  }

  const processedData = processData(data.features, types);
  if (processedData.length <= 0) {
    return null;
  }

  const setTrackData = useCallback(node => {
    if (!!node) {
      node.data = processedData;
    }
  }, []);

  const setTableData = useCallback(node => {
    if (!!node) {
      node.data = processedData;
      node.columns = columns;
    }
  }, []);

  return (
    <Fragment>
      <h4>Features</h4>
      <protvista-manager attributes="highlight displaystart displayend">
        <protvista-navigation length={data.sequence.value.length} />
        <protvista-track
          ref={setTrackData}
          length={data.sequence.value.length}
          layout="non-overlapping"
        />
        <protvista-sequence
          sequence={data.sequence.value}
          length={data.sequence.value.length}
          height="20"
        />
        <protvista-datatable ref={setTableData} />
      </protvista-manager>
    </Fragment>
  );
};

export default FeaturesView;
