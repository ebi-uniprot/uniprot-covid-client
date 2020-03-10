import React from 'react';

import './styles/HomePageLayout.scss';
import BaseLayout from './BaseLayout';

type HomePageLayoutProps = {
  children: JSX.Element[];
};

const HomePageLayout: React.FC<HomePageLayoutProps> = props => {
  const { children } = props;
  return (
    <BaseLayout isHomePage>
      <section id="layout" data-layout="home-page">
        <section id="layout-content">{children}</section>
      </section>
    </BaseLayout>
  );
};

export default HomePageLayout;
