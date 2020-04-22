import React, { FC, useRef, useEffect, useState } from 'react';
import ProtvistaUniprot, {
  transformDataFeatureAdapter,
  transformDataProteomicsAdapter,
  transformDataStructureAdapter,
  transformDataVariationAdapter,
  transformDataInterproAdapter,
} from 'protvista-uniprot';

import useDataApi from '../utils/useDataApi';
import { loadWebComponent } from '../utils/utils';

const transformData = (data: any) => {
  const output = {};

  output.STRUCTURE = transformDataStructureAdapter(data);

  return output;
};

loadWebComponent('protvista-uniprot', ProtvistaUniprot);

const FeatureViewer: FC<{ accession: string }> = ({ accession }) => {
  const viewerRef: any = useRef();
  // not false, otherwise will render as "false" in the DOM, we need undefined
  const [suspended, setSuspended] = useState<true | undefined>(undefined);
  const data = useDataApi(
    `https://www.ebi.ac.uk/uniprot/api/covid-19/uniprotkb/accession/${accession}`
  );

  useEffect(() => {
    if (!data.sequence || !viewerRef.current) return;

    let mounted = true;
    customElements.whenDefined('protvista-uniprot').then(() => {
      if (!mounted || !data.sequence || !viewerRef.current) return;
      // do stuff
      console.log(data);
      viewerRef.current.sequence = data.sequence.value;
      viewerRef.current.displayCoordinates = {
        start: 1,
        end: data.sequence.length,
      };
      viewerRef.current.data = transformData(data);
      setSuspended(undefined);
    });
    // eslint-disable-next-line consistent-return
    return () => {
      mounted = false;
    };
  }, [data]);

  if (!data.sequence) return null;

  return (
    <section>
      <div style={{ height: '80vh' }}>
        <h2>ProtVista visualisation for {accession}</h2>
        <protvista-uniprot suspend={suspended} ref={viewerRef} />
      </div>
    </section>
  );
};

export default FeatureViewer;
