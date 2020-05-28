import React from 'react';

import UniProtHeader from './UniProtHeader';
import UniProtFooter from './UniProtFooter';

import GDPR from '../gdpr/GDPR';
import MessageManagerContainer from '../../../messages/components/MessageManagerContainer';

import './styles/base-layout.scss';
import ErrorBoundary from '../error-component/ErrorBoundary';

const style: React.CSSProperties = {
  fontSize: '.8rem',
  lineHeight: '1.5rem',
  display: 'block',
  padding: '.5rem 0',
  color: '#FFF',
  backgroundColor: 'red',
  position: 'fixed',
  bottom: '4rem',
  right: 0,
  writingMode: 'vertical-rl',
  textOrientation: 'sideways',
  zIndex: 99,
};

const BaseLayout: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <section className="base-layout">
    <section className="main-header">
      <ErrorBoundary>
        <UniProtHeader />
      </ErrorBoundary>
    </section>
    <section className="in-page-messages">
      <ErrorBoundary fallback={null}>
        <MessageManagerContainer />
      </ErrorBoundary>
    </section>
    <a
      style={style}
      target="_blank"
      href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
      rel="noopener noreferrer"
    >
      Report bug
    </a>
    <section className="content">
      <ErrorBoundary>{children}</ErrorBoundary>
    </section>
    <section className="footer">
      <ErrorBoundary>
        <UniProtFooter />
      </ErrorBoundary>
    </section>
    <ErrorBoundary fallback={null}>
      <GDPR />
    </ErrorBoundary>
  </section>
);

export default BaseLayout;
