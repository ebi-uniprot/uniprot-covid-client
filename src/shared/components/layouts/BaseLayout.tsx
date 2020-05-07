import React from 'react';
import UniProtHeader from './UniProtHeader';
import UniProtFooter from './UniProtFooter';
import GDPR from '../gdpr/GDPR';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';
import './styles/base-layout.scss';

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
    <section className="base-layout">
      <section className="main-header">
        <UniProtHeader isHomePage={isHomePage} isSearchPage={isSearchPage} />
      </section>
      <section className="in-page-messages">
        <MessageManagerContainer />
      </section>
      <a
        style={style}
        target="_blank"
        href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
        rel="noopener noreferrer"
      >
        Report bug
      </a>
      {children}
      <section className="footer">
        <UniProtFooter />
      </section>
      <GDPR />
    </section>
  );
};

export default BaseLayout;
