/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';

// NOTE: this dependency is quite big, so make sure to download this whole file
// NOTE: ('GoRibbon.tsx') as a dynamic import to code-split it
import Ribbon, { RibbonDataProvider } from '@geneontology/ribbon';

import '@geneontology/ribbon/es/main.scss';
import './styles/go-ribbon.scss';

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

const GoRibbon: FC<{ primaryAccession: string }> = ({ primaryAccession }) => (
  <div className="GoRibbon">
    <h3>GO Annotations</h3>
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
        <div className="GoRibbon__container">
          {dataReceived && (
            <Ribbon
              entities={entities}
              config={config}
              showing
              entityLabel={POSITION.RIGHT}
              colorBy={COLOR_BY.CLASS_COUNT}
              binaryColor={false}
              oddEvenColor
            />
          )}
          {!dataReceived && dataError && (
            <div className="GoRibbon__container__message">
              Cannot load Go Ribbon visualisation due to server error
            </div>
          )}
          {!dataReceived && !dataError && (
            <div className="GoRibbon__container__message">Loading...</div>
          )}
        </div>
      )}
    </RibbonDataProvider>
  </div>
);

export default GoRibbon;
