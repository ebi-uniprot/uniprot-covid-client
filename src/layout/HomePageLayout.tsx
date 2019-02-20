import React from 'react';
import BaseLayout from './BaseLayout';

import './styles/HomePageLayout.scss';

type HomePageLayoutProps = {
  children: Array<JSX.Element>;
};

const HomePageLayout: React.FC<HomePageLayoutProps> = props => {
  const { children } = props;
  return (
    <section id="layout" data-layout="home-page">
      <section id="layout-content">{children}</section>
    </section>
  );
};

export default HomePageLayout;
