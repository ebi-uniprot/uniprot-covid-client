import React, { FC } from 'react';
import { flatten } from 'lodash';
import { Card } from 'franklin-sites';
import ProtvistaStructure from 'protvista-structure';
import { loadWebComponent } from '../../utils/utils';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import FeaturesView from './components/FeaturesView';
import 'litemol/dist/css/LiteMol-plugin.css';
import XRefView from './components/XRefView';

const StructureSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
  crc64?: string;
}> = ({ data, primaryAccession, sequence, crc64 }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  loadWebComponent('protvista-structure', ProtvistaStructure);
  const sortedIds = flatten(
    data.featuresData.map(
      ({ evidences }) => evidences && evidences.map(({ id }) => id)
    )
  ).sort();
  const firstId = sortedIds && sortedIds.length ? sortedIds[0] : '';

  return (
    <div id={EntrySection.Structure}>
      <Card title={EntrySection.Structure}>
        <protvista-structure accession={primaryAccession} pdb-id={firstId} />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        {/* TODO: filter out PDB */}
        <XRefView
          xrefs={data.xrefData}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      </Card>
    </div>
  );
};

export default StructureSection;
