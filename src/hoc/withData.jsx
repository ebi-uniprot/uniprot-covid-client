// @flow
import React, { Component } from 'react';
import fetchData from '../utils/fetchData';

type Props = {};
type State = {
  data: [],
};

const withData = (url: Function, prepareData: Function = x => x) => (
  WrappedComponent: Component,
) => {
  class WithData extends WrappedComponent<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      const endpoint = url(this.props);
      fetchData(endpoint)
        .then(data => prepareData(data.data))
        .then((data) => {
          this.setState({ data });
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
