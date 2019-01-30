import React from 'react';

import UniProtHeader from '../header/UniProtHeader';
import UniProtFooter from '../footer/UniProtFooter';

type BaseLayoutProps = {
  children: JSX.Element;
  isHomePage?: boolean;
};

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
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
