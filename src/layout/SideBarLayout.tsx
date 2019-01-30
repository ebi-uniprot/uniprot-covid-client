import React from 'react';
import BaseLayout from './BaseLayout';

import './styles/SideBarLayout.scss';

type SideBarLayoutProps = {
  sidebar: JSX.Element;
  content: JSX.Element;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({ sidebar, content }) => (
  <BaseLayout>
    <section id="sidebar-layout" data-layout="left-sidebar-layout">
      <section id="sidebar-layout__sidebar">{sidebar}</section>
      <section id="sidebar-layout__content">{content}</section>
    </section>
  </BaseLayout>
);

export default SideBarLayout;
