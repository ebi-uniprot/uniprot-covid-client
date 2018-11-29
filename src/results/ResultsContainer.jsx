import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchTerms } from './state/actions';

export class Results extends Component {
  componentDidMount() {
    const { query, dispatchFetchSearchTerms } = this.props;
    dispatchFetchSearchTerms(query);
  }

  render() {
    return <ResultsTable />;
  }
}

const mapStateToProps = state => ({
  query: state.advancedSearch.query,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchSearchTerms: query => dispatch(fetchSearchTerms(query)),
});

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);

export default ResultsContainer;
