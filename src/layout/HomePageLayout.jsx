// @flow
import React from 'react';
import type { Node } from 'react';
import BaseLayout from './BaseLayout';

import './styles/HomePageLayout.scss';

type Props = {
  children: Node,
};

const HomePageLayout = (props: Props) => {
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
