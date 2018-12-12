// @flow
import React from 'react';
import type { Node } from 'react';

import UniProtHeader from '../header/UniProtHeader';
import UniProtFooter from '../footer/UniProtFooter';

type Props = {
  children: Node,
};

const BaseLayout = (props: Props) => {
  const { children, isHomePage } = props;
  return (
    <section id="outter-layout">
      <UniProtHeader isHomePage={isHomePage} />
      {children}
      <UniProtFooter />
    </section>
  );
};

export default BaseLayout;
