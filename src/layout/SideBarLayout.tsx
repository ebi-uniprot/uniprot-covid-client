import React from 'react';
import BaseLayout from './BaseLayout';

import './styles/SideBarLayout.scss';

type SideBarLayoutProps = {
  title: JSX.Element;
  sidebar: JSX.Element;
  content: JSX.Element;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  content,
}) => (
  <section className="sidebar-layout" data-layout="left-sidebar-layout">
    <section className="sidebar-layout__title">{title}</section>
    <section className="sidebar-layout__sidebar">{sidebar}</section>
    <section className="sidebar-layout__content">{content}</section>
  </section>
);

export default SideBarLayout;
