import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from './state/actions';
import ResultsTable from './ResultsTable';
import { serializableDeepCopy } from '../utils/utils';
import { isClauseTouched } from '../advanced-search/utils/clause';

export class Results extends Component {
  componentDidMount() {
    console.log('here');
    const { queryClauses: queryClausesFromProps, dispatchFetchResults, location } = this.props;
    const touchedQueryClausesFromProps = queryClausesFromProps.filter(isClauseTouched);
    const queryFromUrl = location.search;
    if (touchedQueryClausesFromProps) {
      // The user has provided some input from the advanced-search so fetch results from this
      console.log(
        'user provided input from the advanced-search so fetch results from this',
        touchedQueryClausesFromProps,
      );
      dispatchFetchResults(touchedQueryClausesFromProps);
      return;
    }
    if (queryFromUrl) {
      // decode query from URL
      console.log('decode query from URL', queryFromUrl);
      return;
    }
    // run query on all
    console.log('run query on all');
  }

  render() {
    const { queryClauses, results } = this.props;
    return <ResultsTable queryClauses={queryClauses} results={results} />;
  }
}

const mapStateToProps = state => ({
  queryClauses: serializableDeepCopy(state.query.clauses),
  results: state.search.results,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: query => dispatch(fetchResults(query)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
