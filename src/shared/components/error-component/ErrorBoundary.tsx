import React, { Component, ErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';

import ErrorComponent from './ErrorComponent';

type Props = RouteComponentProps & {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};
type State = { error?: Error; location?: Location };

/**
 * Use this ErrorBoundary to wrap any unit of components which might, for any
 * reason, fail to render or throw.
 * Provide a fallback message if you need to display a specific message instead
 * of the default one.
 * Provide `null` as a fallback to simply hide the error.
 * Will try to rerender on location change.
 */
class ErrorBoundary extends Component<Props, State> {
  static defaultProps = { fallback: <ErrorComponent /> };

  constructor(props: Props) {
    super(props);

    this.state = { location: props.location };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (
      nextProps.location.pathname === prevState.location?.pathname &&
      nextProps.location.search === prevState.location?.search
    ) {
      // if same pathname and querystring, don't do anything
      return null;
    }
    // otherwise, reset error, and keep new location in state
    return { error: null, location: nextProps.location };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
