import React, { useCallback, FC, useState } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaDatatable from 'protvista-datatable';
import ProtvistaVariation from 'protvista-variation';
import ProtvistaVariationAdapter from 'protvista-variation-adapter';
import ProtvistaFilter, { ProtvistaCheckbox } from 'protvista-filter';
import { html } from 'lit-html';
import { loadWebComponent } from '../../../utils/utils';
import useDataApi from '../../../utils/useDataApi';
import apiUrls, { joinUrl } from '../../../utils/apiUrls';
import FeatureType from '../../../model/types/FeatureType';
import './styles/VariationView.scss';
import {
  UniProtProtvistaEvidenceTag,
  UniProtEvidenceTagContent,
} from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
import { EvidenceData } from '../../../model/types/EvidenceCodes';

type ProtvistaVariant = {
  begin: number;
  end: number;
  type: FeatureType.VARIANT;
  wildType: string;
  alternativeSequence: string;
  polyphenPrediction?: string;
  polyphenScore?: number;
  siftPrediction?: string;
  siftScore?: number;
  description?: string;
  consequenceType: string;
  cytogeneticBand?: string;
  genomicLocation?: string;
  somaticStatus?: number;
  sourceType: string;
  association?: {
    description: string;
    disease: boolean;
    name: string;
    evidences: { code: string; source: { name: string; id: string } }[];
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

const formatVariantDescription = (description: string) => {
  /* eslint-disable no-useless-escape */
  const pattern = /\[(\w+)\]: ([^\[]+)/g;
  const match = description.match(pattern);
  return match;
};

const VariationView: FC<{ primaryAccession: string }> = ({
  primaryAccession,
}) => {
  loadWebComponent('protvista-variation', ProtvistaVariation);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);
  loadWebComponent('protvista-sequence', ProtvistaSequence);
  loadWebComponent('protvista-manager', ProtvistaManager);
  loadWebComponent('protvista-datatable', ProtvistaDatatable);
  loadWebComponent('protvista-filter', ProtvistaFilter);
  loadWebComponent('protvista-checkbox', ProtvistaCheckbox);
  loadWebComponent('protvista-variation-adapter', ProtvistaVariationAdapter);

  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] = useState();
  const [selectedReferences, setSelectedReferences] = useState();

  const evidenceTagCallback = (
    evidenceData: EvidenceData,
    references: Evidence[] | undefined
  ) => {
    setSelectedEvidenceData(evidenceData);
    setSelectedReferences(references);
    setShowEvidenceTagData(true);
  };

  const columns = {
    positions: {
      label: 'Position(s)',
      resolver: (d: ProtvistaVariant) =>
        d.begin === d.end ? d.begin : `${d.begin}-${d.end}`,
    },
    change: {
      label: 'Change',
      resolver: (d: ProtvistaVariant) =>
        `${d.wildType}>${d.alternativeSequence}`,
    },
    consequence: {
      label: 'Consequence',
      child: true,
      resolver: (d: ProtvistaVariant) => d.consequenceType,
    },
    sift: {
      label: 'SIFT prediction',
      child: true,
      resolver: (d: ProtvistaVariant) => `${d.siftPrediction} (${d.siftScore})`,
    },
    polyphen: {
      label: 'Polyphen prediction',
      child: true,
      resolver: (d: ProtvistaVariant) =>
        `${d.polyphenPrediction} (${d.polyphenScore})`,
    },
    description: {
      label: 'Description',
      resolver: (d: ProtvistaVariant) => {
        if (!d.description) {
          return html``;
        }
        const formatedDescription = formatVariantDescription(d.description);
        return (
          formatedDescription &&
          formatedDescription.map(
            descriptionLine =>
              html`
                <p>${descriptionLine}</p>
              `
          )
        );
      },
    },
    somaticStatus: {
      label: 'Somatic',
      child: true,
      resolver: (d: ProtvistaVariant) => (d.somaticStatus === 1 ? 'Yes' : 'No'),
    },
    hasDisease: {
      label: 'Disease association',
      resolver: (d: ProtvistaVariant) =>
        d.association && d.association.length > 0 ? 'Y' : 'N',
    },
    association: {
      label: 'Disease association',
      child: true,
      resolver: (d: ProtvistaVariant) =>
        d.association
          ? d.association.map(association => {
              return html`
                <p>
                  ${association.name}
                  ${association.evidences &&
                    UniProtProtvistaEvidenceTag(
                      association.evidences.map(evidence => {
                        return ({
                          evidenceCode: evidence.code,
                          source: evidence.source.name,
                          id: evidence.source.id,
                        } as unknown) as Evidence;
                      }),
                      evidenceTagCallback
                    )}
                </p>
              `;
            })
          : '',
    },
  };

  const data = useDataApi(joinUrl(apiUrls.variation, primaryAccession));

  const setTrackData = useCallback(
    node => {
      if (node !== null && data.features) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.length = data.sequence.length;
      }
    },
    [data]
  );

  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data.features;
        // eslint-disable-next-line no-param-reassign
        node.columns = columns;
      }
    },
    [data, columns]
  );

  if (!data.sequence) {
    return null;
  }

  return (
    <div>
      <h4>Variants</h4>
      <protvista-manager attributes="highlight displaystart displayend activefilters filters">
        <div className="variation-view">
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
        </div>
        <protvista-datatable ref={setTableData} />
      </protvista-manager>
      <div
        className={`evidence-tag-content ${showEvidenceTagData &&
          'evidence-tag-content--visible'}`}
      >
        {selectedEvidenceData && selectedReferences && (
          <UniProtEvidenceTagContent
            evidenceData={selectedEvidenceData}
            references={selectedReferences}
          />
        )}
      </div>
    </div>
  );
};

export default VariationView;
