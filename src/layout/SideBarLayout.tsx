import React, { Fragment } from 'react';
import BaseLayout from './BaseLayout';

type SideBarLayoutProps = {
  title?: JSX.Element;
  sidebar: JSX.Element;
  children: JSX.Element;
  actionButtons: JSX.Element;
  invert?: boolean;
};

const SideBarLayout: React.FC<SideBarLayoutProps> = ({
  title,
  sidebar,
  actionButtons,
  children,
}) => (
  <BaseLayout>
    <Fragment>
      {title && <section className="base-layout__title">{title}</section>}
      {actionButtons && (
        <section className="base-layout__action-buttons">
          {actionButtons}
        </section>
      )}
      <section className="base-layout__sidebar">{sidebar}</section>
      <section className="base-layout__content">{children}</section>
    </Fragment>
  </BaseLayout>
);

export default SideBarLayout;
