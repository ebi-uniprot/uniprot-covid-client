import React, { FC } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaMSA from 'protvista-msa';
import ProtvistaManager from 'protvista-manager';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

const HSPDetailPanel: FC<{ hsp: BlastHsp }> = ({ hsp }) => {
  console.log(hsp);
  return (
    <SlidingPanel position="bottom">
      <>
        <h2>{hsp.hsp_expect}</h2>
        <protvista-manager>
          <protvista-navigation />
          <protvista-msa />
          <protvista-track />
        </protvista-manager>
      </>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
