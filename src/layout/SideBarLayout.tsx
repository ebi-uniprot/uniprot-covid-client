import React from 'react';

import './styles/SideBarLayout.scss';

type SideBarLayoutProps = {
  title?: JSX.Element;
  sidebar: JSX.Element;
  content: JSX.Element;
  invert?: boolean;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  content,
  invert = false,
}) => (
  <section
    className={`sidebar-layout ${invert && 'sidebar-layout--inverted'}`}
    data-layout="left-sidebar-layout"
  >
    {title && <section className="sidebar-layout__title">{title}</section>}
    <section className="sidebar-layout__sidebar">{sidebar}</section>
    <section className="sidebar-layout__content">{content}</section>
  </section>
);

export default SideBarLayout;
