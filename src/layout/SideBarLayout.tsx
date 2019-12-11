import React from 'react';

import './styles/SideBarLayout.scss';

type SideBarLayoutProps = {
  title?: JSX.Element;
  sidebar: JSX.Element;
  children: (string | JSX.Element)[] | JSX.Element;
  invert?: boolean;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  children,
  invert = false,
}) => (
  <section
    className={`sidebar-layout ${invert && 'sidebar-layout--inverted'}`}
    data-layout="left-sidebar-layout"
  >
    {title && <section className="sidebar-layout__title">{title}</section>}
    <section className="sidebar-layout__sidebar">{sidebar}</section>
    <section className="sidebar-layout__content">{children}</section>
  </section>
);

export default SideBarLayout;
