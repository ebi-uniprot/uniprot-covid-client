import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResults } from './state/actions';
import ResultsTable from './ResultsTable';

export class Results extends Component {
  componentDidMount() {
    const { query, columns, dispatchFetchResults } = this.props;
    dispatchFetchResults(query, columns);
  }

  render() {
    return <ResultsTable {...this.props} />;
  }
}

const mapStateToProps = state => ({
  query: state.query,
  columns: state.columns,
  results: state.results,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: (query, columns) => dispatch(fetchResults(query, columns)),
});

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);

export default ResultsContainer;
