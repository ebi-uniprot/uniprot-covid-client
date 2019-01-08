import React from 'react';

import UniProtHeader from '../header/UniProtHeader';
import UniProtFooter from '../footer/UniProtFooter';

type Props = {
  children: Node;
};

const BaseLayout = (props: Props) => {
  const { children, isHomePage } = props;
  return (
    <section id="outer-layout">
      <UniProtHeader isHomePage={isHomePage} />
      {children}
      <UniProtFooter />
    </section>
  );
};

export default BaseLayout;
