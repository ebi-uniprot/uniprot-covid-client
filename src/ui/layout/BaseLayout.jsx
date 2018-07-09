import React, { Component } from 'react';

import UniProtHeader from '../header/UniProtHeader';
import UniProtFooter from '../footer/UniProtFooter';

class BaseLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <section id="outter-layout">
        <UniProtHeader />
        { children }
        <UniProtFooter />
      </section>
    );
  }
}

export default BaseLayout;
