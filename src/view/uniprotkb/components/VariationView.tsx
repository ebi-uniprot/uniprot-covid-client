import React, { useCallback, FC } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaVariation from 'protvista-variation';
import ProtvistaVariationAdapter from 'protvista-variation-adapter';
import ProtvistaFilter, { ProtvistaCheckbox } from 'protvista-filter';
import { loadWebComponent } from '../../../utils/utils';
import useDataApi from '../../../utils/useDataApi';
import apiUrls, { joinUrl } from '../../../utils/apiUrls';
import FeatureType from '../../../model/types/FeatureType';
import { EvidenceType } from '../../../search/types/searchTypes';
import './styles/VariationView.scss';

type Variant = {
  begin: number;
  end: number;
  type: FeatureType.VARIANT;
  wildType: string;
  alternativeSequence: string;
  description?: string;
  consequenceType: string;
  cytogeneticBand?: string;
  genomicLocation?: string;
  polyphenPrediction?: string;
  polyphenScore?: number;
  siftPrediction?: string;
  siftScore?: number;
  somaticStatus?: number;
  sourceType: string;
  association?: {
    description: string;
    disease: boolean;
    name: string;
    evidences: EvidenceType[];
  }[];
  xrefs: {
    alternativeUrl?: string;
    id: string;
    name: string;
    url: string;
  }[];
};

interface ChangeEvent extends Event {
  detail?: { type: string; value: string[] };
}

const VariationView: FC<{ primaryAccession: string }> = ({
  primaryAccession,
}) => {
  loadWebComponent('protvista-variation', ProtvistaVariation);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);
  loadWebComponent('protvista-sequence', ProtvistaSequence);
  loadWebComponent('protvista-manager', ProtvistaManager);
  loadWebComponent('protvista-filter', ProtvistaFilter);
  loadWebComponent('protvista-checkbox', ProtvistaCheckbox);
  loadWebComponent('protvista-variation-adapter', ProtvistaVariationAdapter);

  const data = useDataApi(joinUrl(apiUrls.variation, primaryAccession));

  const setTrackData = useCallback(
    node => {
      if (node !== null && data.features) {
        node.data = data;
        node.length = data.sequence.length;
      }
    },
    [data]
  );

  const addTooltipEventListener = useCallback(node => {
    if (node !== null) {
      node.addEventListener('change', (e: ChangeEvent) => console.log(e));
    }
  }, []);

  if (!data.sequence) {
    return null;
  }

  return (
    <div className="variation-view">
      <h4>Variants</h4>
      <protvista-manager
        attributes="highlight displaystart displayend activefilters filters"
        ref={addTooltipEventListener}
      >
        <protvista-navigation length={data.sequence.length} />
        <protvista-sequence
          length={data.sequence.length}
          sequence={data.sequence}
          height="20"
        />
        <protvista-filter />
        <protvista-variation length={data.sequence.length}>
          <protvista-variation-adapter ref={setTrackData} />
        </protvista-variation>
      </protvista-manager>
      <protvista-tooltip />
    </div>
  );
};

export default VariationView;
