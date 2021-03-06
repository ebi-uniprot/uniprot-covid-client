import React, { Fragment, useCallback, useState, FC } from 'react';
import { TemplateResult } from 'lit-html';
import ProtvistaDatatable from 'protvista-datatable';
import { Feature as VariantFeature } from 'protvista-variation-adapter/dist/es/variants';
import { UniProtEvidenceTagContent } from './UniProtKBEvidenceTag';
import { loadWebComponent } from '../../../shared/utils/utils';
import { ProcessedFeature } from './FeaturesView';
import { EvidenceData } from '../../config/evidenceCodes';
import { Evidence } from '../../types/modelTypes';

loadWebComponent('protvista-datatable', ProtvistaDatatable);

type FeatureColumns = {
  [name: string]: {
    label: string;
    resolver: (
      d: ProcessedFeature & VariantFeature
    ) => string | number | TemplateResult | TemplateResult[];
  };
};

export type FeaturesTableCallback = (
  evidenceData: EvidenceData,
  references: Evidence[] | undefined
) => void;

const FeaturesTableView: FC<{
  data: ProcessedFeature[] | VariantFeature[];
  getColumnConfig: (
    callback: (
      evidenceData: EvidenceData,
      references: Evidence[] | undefined
    ) => void
  ) => FeatureColumns;
}> = ({ data, getColumnConfig }) => {
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] = useState<
    EvidenceData
  >();
  const [selectedReferences, setSelectedReferences] = useState<Evidence[]>();

  const evidenceTagCallback: FeaturesTableCallback = (
    evidenceData,
    references
  ) => {
    setSelectedEvidenceData(evidenceData);
    setSelectedReferences(references);
    setShowEvidenceTagData(true);
  };

  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = getColumnConfig(evidenceTagCallback);
      }
    },
    [data, getColumnConfig]
  );

  return (
    <Fragment>
      <protvista-datatable ref={setTableData} />
      <div
        className={`evidence-tag-content ${
          showEvidenceTagData && 'evidence-tag-content--visible'
        }`}
      >
        {selectedEvidenceData && selectedReferences && (
          <UniProtEvidenceTagContent
            evidenceData={selectedEvidenceData}
            evidences={selectedReferences}
          />
        )}
      </div>
    </Fragment>
  );
};

export default FeaturesTableView;
