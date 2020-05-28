import React, { Component } from 'react';

import ErrorComponent from './ErrorComponent';

type Props = { children: React.ReactNode; fallback?: React.ReactNode };
type State = { error?: Error };

/**
 * Use this ErrorBoundary to wrap any unit of components which might, for any
 * reason, fail to render or throw.
 * Provide a fallback message if you need to display a specific message instead
 * of the default one.
 * Provide `null` as a fallback to simply hide the error.
 */
class ErrorBoundary extends Component<Props, State> {
  static defaultProps = { fallback: <ErrorComponent /> };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: object) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
