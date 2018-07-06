import React, { Component, Fragment } from 'react';

import '../../styles/layout/home-page-layout.css';

class HomePageLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <section id="layout" data-layout="home-page">

<h3 style={{color: 'white'}}>Innner Home Page Layout</h3>
        <section id="layout-content">
          { children }
        </section>
      </section>
    );
  }
}

export default HomePageLayout;
