// @flow
import React from 'react';
import type { Node } from 'react';

import UniProtHeader from '../header/UniProtHeader';
import UniProtFooter from '../footer/UniProtFooter';

type Props = {
  children: Node,
};

const BaseLayout = (props: Props) => {
  const { children } = props;
  return (
    <section id="outter-layout">
      <UniProtHeader />
      {children}
      <UniProtFooter />
    </section>
  );
};

export default BaseLayout;
