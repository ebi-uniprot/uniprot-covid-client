import React from 'react';
import BaseLayout from './BaseLayout';

import './styles/SideBarLayout.scss';

type SideBarLayoutProps = {
  title: JSX.Element;
  sidebar: JSX.Element;
  content: JSX.Element;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({ title, sidebar, content }) => (
  <BaseLayout>
    <section id="sidebar-layout" data-layout="left-sidebar-layout">
      <section id="sidebar-layout__title">{title}</section>
      <section id="sidebar-layout__sidebar">{sidebar}</section>
      <section id="sidebar-layout__content">{content}</section>
    </section>
  </BaseLayout>
);

export default SideBarLayout;
