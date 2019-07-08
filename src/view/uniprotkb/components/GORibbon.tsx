import React, { FC } from 'react';
import Ribbon, { RibbonDataProvider } from '@geneontology/ribbon';
import '@geneontology/ribbon/es/main.scss';
import '../../../styles/geneontology-ribbon.scss';

// The label position of each entity
enum POSITION {
  NONE = 0,
  LEFT = 1,
  RIGHT = 2,
  BOTTOM = 3,
}

// The input count value for the color
enum COLOR_BY {
  CLASS_COUNT = 0,
  ANNOTATION_COUNT = 1,
}

// continuous or binary color
const binaryColor = false;

const GORibbon: FC<{ primaryAccession: string }> = ({ primaryAccession }) => (
  <RibbonDataProvider subject={`UniProtKB:${primaryAccession}`}>
    {({
      entities,
      config,
      dataError,
      dataReceived,
    }: {
      entities: any;
      config: any;
      dataError: any;
      dataReceived: any;
    }) => (
      <div>
        {dataReceived ? (
          <Ribbon
            entities={entities}
            config={config}
            showing={true}
            entityLabel={POSITION.RIGHT}
            colorBy={COLOR_BY.CLASS_COUNT}
            binaryColor={binaryColor}
            oddEvenColor
          />
        ) : null}
        {dataError}
        {!dataReceived && !dataError && (
          <div style={{ fontSize: '2rem', paddingLeft: '2rem' }}>
            Loading...
          </div>
        )}
      </div>
    )}
  </RibbonDataProvider>
);

export default GORibbon;
