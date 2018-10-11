// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  children: Node,
};

const HomePageLayout = (props: Props) => {
  const { children } = props;
  return (
    <section id="layout" data-layout="home-page">
      <section id="layout-content">{children}</section>
    </section>
  );
};

export default HomePageLayout;
