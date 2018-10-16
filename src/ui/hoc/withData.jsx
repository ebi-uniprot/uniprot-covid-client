// @flow
import React, { Component } from 'react';
import fetchData from './fetchData';

type Props = {};
type State = {
  data: [],
};

const withData = url => (WrappedComponent: Component) => {
  class WithData extends WrappedComponent<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      const endpoint = typeof url === 'function' ? url(this.props) : url;
      fetchData(endpoint)
        .then((data) => {
          this.setState({ data: data.data });
        })
        .catch(e => console.error(e));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }
  return WithData;
};

export default withData;
