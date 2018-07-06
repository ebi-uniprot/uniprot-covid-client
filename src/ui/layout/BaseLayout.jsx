import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class BaseLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <section id="outter-layout" style={{background:'blue', padding: '2rem'}}>
        <Header />
        { children }
        <Footer />
      </section>
    );
  }
}

export default BaseLayout;
