import React, { Fragment, useCallback } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaManager from 'protvista-manager';
import ProtvistaDatatable from 'protvista-datatable';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import { loadWebComponent } from '../utils/utils';

type FeatureLocation = {
  value: number;
  modifier: string;
};

type Feature = {
  type: string;
  featureId: string;
  description: string;
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
  };
};

type ProtvistaFeature = {
  type: string;
  description: string;
  start: number;
  end: number;
};

type FeaturesViewProps = {
  data: {
    sequence: {
      value: string;
    };
    features?: Feature[];
  };
  types?: string[];
};

const columns = {
  type: {
    label: 'Type',
    resolver: (d: ProtvistaFeature) => d.type,
  },
  positions: {
    label: 'Positions',
    resolver: (d: ProtvistaFeature) =>
      d.start === d.end ? d.start : `${d.start}-${d.end}`,
  },
  description: {
    label: 'Description',
    resolver: (d: ProtvistaFeature) => d.description,
  },
};

const processData = (data: Feature[], types: string[] = []) =>
  data
    .filter(d => types.length <= 0 || types.includes(d.type))
    .map(d => {
      return {
        accession: d.featureId,
        start: d.location.start.value,
        end: d.location.end.value,
        type: d.type,
        description: d.description,
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

  const setTrackData = useCallback(node => {
    if (node !== null) {
      node.data = processedData;
    }
  }, []);

  const setTableData = useCallback(node => {
    if (node !== null) {
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
