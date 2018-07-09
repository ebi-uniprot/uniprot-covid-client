import React, { Component, Fragment } from 'react';

class HomePageLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <section id="layout" data-layout="home-page">
        <section id="layout-content">
          { children }
        </section>
      </section>
    );
  }
}

export default HomePageLayout;
