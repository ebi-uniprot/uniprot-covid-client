import React from 'react';

import UniProtHeader from '../header/UniProtHeader';
import UniProtFooter from '../footer/UniProtFooter';

type BaseLayoutProps = {
  children: JSX.Element;
  isHomePage?: boolean;
  isSearchPage?: boolean;
};

const style: React.CSSProperties = {
  fontSize: '.8rem',
  lineHeight: '1.5rem',
  display: 'block',
  padding: '.5rem 0',
  color: '#FFFFFF',
  backgroundColor: 'red',
  position: 'fixed',
  bottom: '4rem',
  right: 0,
  writingMode: 'vertical-rl',
  textOrientation: 'sideways',
  zIndex: 99,
};

const BaseLayout: React.FC<BaseLayoutProps> = props => {
  const { children, isHomePage, isSearchPage } = props;
  return (
    <section id="outer-layout">
      <UniProtHeader isHomePage={isHomePage} isSearchPage={isSearchPage} />
      <a
        style={style}
        target="_blank"
        href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
        rel="noopener noreferrer"
      >
        Report bug
      </a>
      {children}
      <UniProtFooter />
    </section>
  );
};

export default BaseLayout;
